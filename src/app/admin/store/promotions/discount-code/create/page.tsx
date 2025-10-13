"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Switch,
  DatePicker,
  Button,
} from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import BackToPage from "@/components/Helper/BackToPage";
import PriceNumberInput from "@/components/Admin/_products/__create/helpers/PriceInput";
import { useRouter } from "next/navigation";
import LabeledNumberWithUnitInput from "@/components/Admin/_products/__create/helpers/LabeledNumberWithUnitInput";
import TextInput from "@/components/Helper/TextInput/TextInput";

type AmountType = "percent" | "fixed";

type CouponFormState = {
  code: string;
  type: AmountType;
  amount?: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  startDate?: CalendarDate | null;
  endDate?: CalendarDate | null;
  isActive: boolean;
  forFirstOrder: boolean;
};

// CalendarDate → ISO (00:00:00.000Z)
const calToISO = (c?: CalendarDate | null) => {
  if (!c) return undefined;
  const d = new Date(c.year, c.month - 1, c.day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

export default function CreateDiscountCode() {
  const router = useRouter();

  const [form, setForm] = useState<CouponFormState>({
    code: "",
    type: "percent",
    amount: undefined,
    minOrderAmount: undefined,
    maxDiscountAmount: undefined,
    usageLimit: undefined,
    startDate: null,
    endDate: null,
    isActive: true,
    forFirstOrder: false,
  });

  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateForm = <K extends keyof CouponFormState>(
    key: K,
    value: CouponFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid = () =>
    form.code.trim().length > 0 &&
    typeof form.amount === "number" &&
    form.amount > 0;

  const handleSubmit = async () => {
    setTouched(true);
    if (!isValid()) return;

    const payload: any = {
      code: form.code.trim(),
      type: form.type,
      amount: form.amount,
      is_active: form.isActive,
      for_first_order: form.forFirstOrder,
    };

    const sISO = calToISO(form.startDate);
    const eISO = calToISO(form.endDate);
    if (sISO) payload.start_date = sISO;
    if (eISO) payload.end_date = eISO;

    if (form.usageLimit && form.usageLimit > 0)
      payload.usage_limit = form.usageLimit;

    if (form.minOrderAmount && form.minOrderAmount > 0)
      payload.min_order_amount = form.minOrderAmount;

    if (form.maxDiscountAmount && form.maxDiscountAmount > 0)
      payload.max_discount_amount = form.maxDiscountAmount;

    try {
      setSubmitting(true);
      const res = await fetch("/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.message || "خطا در ثبت کد تخفیف");
      }

      router.push("/admin/store/promotions/discount-code");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      code: "",
      type: "percent",
      amount: undefined,
      minOrderAmount: undefined,
      maxDiscountAmount: undefined,
      usageLimit: undefined,
      startDate: null,
      endDate: null,
      isActive: true,
      forFirstOrder: false,
    });
    setTouched(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <BackToPage
        title="بازگشت به لیست کدهای تخفیف"
        link="/admin/store/promotions/discount-code"
      />

      <Card className="shadow-md">
        <CardBody className="flex flex-col gap-6">
          {/* اطلاعات اصلی */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TextInput
              label="کد تخفیف"
              placeholder="مثلاً WELCOME10"
              value={form.code}
              onChange={(val) => updateForm("code", val)}
              isRequired
              isActiveError={touched}
              allowEnglishOnly
              allowNumbers
              allowSpaces={false}
              allowSpecialChars
              allowedSpecialChars={["-", "_"]}
              description="کد فقط می‌تواند شامل حروف انگلیسی، عدد و نمادهای - و _ باشد."
            />

            {/* نوع و مقدار تخفیف */}
            <LabeledNumberWithUnitInput
              label="مقدار تخفیف"
              placeholder={
                form.type === "percent" ? "مثلاً 10" : "مثلاً 50,000"
              }
              value={form.amount ?? 0}
              onValueChange={(val) =>
                updateForm("amount", val === undefined ? undefined : val)
              }
              selectedKey={form.type}
              onSelectChange={(val: any) =>
                updateForm("type", val as "percent" | "fixed")
              }
              options={[
                { key: "percent", title: "درصد" },
                { key: "fixed", title: "مبلغ ثابت" },
              ]}
            />

            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <PriceNumberInput
                value={form.minOrderAmount}
                onChange={(v) => updateForm("minOrderAmount", v || undefined)}
                label="حداقل مبلغ سفارش (اختیاری)"
                placeholder="مثلاً 100,000"
                suffix="تومان"
                isRequired={false}
              />

              <PriceNumberInput
                value={form.maxDiscountAmount}
                onChange={(v) =>
                  updateForm("maxDiscountAmount", v || undefined)
                }
                label="سقف تخفیف (اختیاری)"
                placeholder="مثلاً 50,000"
                suffix="تومان"
                isRequired={false}
              />

              <PriceNumberInput
                value={form.usageLimit}
                onChange={(v) => updateForm("usageLimit", v || undefined)}
                label="محدودیت تعداد استفاده (اختیاری)"
                placeholder="مثلاً 100"
                suffix="عدد"
                isRequired={false}
              />
            </div>
          </div>

          {/* تاریخ‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="تاریخ شروع اعتبار (اختیاری)"
              labelPlacement="outside"
              showMonthAndYearPickers
              variant="bordered"
              value={form.startDate ?? undefined}
              onChange={(val: any) => updateForm("startDate", val ?? null)}
            />
            <DatePicker
              label="تاریخ پایان اعتبار (اختیاری)"
              labelPlacement="outside"
              showMonthAndYearPickers
              variant="bordered"
              value={form.endDate ?? undefined}
              onChange={(val: any) => updateForm("endDate", val ?? null)}
            />
          </div>

          {/* وضعیت‌ها */}
          <div className="flex flex-wrap gap-6">
            <Switch
              isSelected={form.isActive}
              onValueChange={(v) => updateForm("isActive", v)}
              color="success"
              size="sm"
            >
              فعال باشد
            </Switch>

            <Switch
              isSelected={form.forFirstOrder}
              onValueChange={(v) => updateForm("forFirstOrder", v)}
              color="secondary"
              size="sm"
            >
              فقط برای اولین سفارش
            </Switch>
          </div>

          {/* دکمه‌ها */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="flat"
              color="default"
              onPress={handleReset}
              isDisabled={submitting}
            >
              پاک‌سازی فرم
            </Button>
            <Button
              color="secondary"
              variant="solid"
              isLoading={submitting}
              onPress={handleSubmit}
            >
              ثبت کد تخفیف
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
