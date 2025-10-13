"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Switch, DatePicker, Button } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";
import BackToPage from "@/components/Helper/BackToPage";
import PriceNumberInput from "@/components/Admin/_products/__create/helpers/PriceInput";
import LabeledNumberWithUnitInput from "@/components/Admin/_products/__create/helpers/LabeledNumberWithUnitInput";
import TextInput from "@/components/Helper/TextInput/TextInput";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { LuTicket } from "react-icons/lu";
import { calToISO } from "@/utils/dateHelpers";
import {
  useCreateCoupon,
  useUpdateCoupon,
  useGetOneCoupon,
} from "@/hooks/api/useCoupon";

type AmountType = "percent" | "fixed";

type CouponFormState = {
  code: string;
  type: AmountType;
  amount?: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  usage_limit?: number;
  start_date?: CalendarDate | null;
  end_date?: CalendarDate | null;
  is_active: boolean;
  for_first_order: boolean;
};

export default function CouponFormPage() {
  const router = useRouter();
  const params = useSearchParams();

  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;
  const isEditMode = !!id;

  //? Hooks
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon(id || 0);
  const { data: couponData } = useGetOneCoupon(id);
  console.log(couponData);

  const [form, setForm] = useState<CouponFormState>({
    code: "",
    type: "percent",
    amount: undefined,
    min_order_amount: undefined,
    max_discount_amount: undefined,
    usage_limit: undefined,
    start_date: null,
    end_date: null,
    is_active: true,
    for_first_order: false,
  });

  const [touched, setTouched] = useState(false);

  const updateForm = <K extends keyof CouponFormState>(
    key: K,
    value: CouponFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (couponData?.data) {
      const {
        code,
        for_first_order,
        is_active,
        type,
        amount,
        end_date,
        max_discount_amount,
        min_order_amount,
        start_date,
        usage_limit,
      } = couponData?.data;
      setForm({
        code,
        type,
        amount,
        min_order_amount,
        max_discount_amount,
        usage_limit,
        start_date: start_date ? parseDate(start_date.split("T")[0]) : null,
        end_date: end_date ? parseDate(end_date.split("T")[0]) : null,
        is_active,
        for_first_order,
      });
    }
  }, [couponData]);

  const isValid = () =>
    form.code.trim().length > 0 &&
    typeof form.amount === "number" &&
    form.amount > 0;

  const handleSubmit = async () => {
    setTouched(true);
    console.log(isValid());

    if (!isValid()) return;

    const payload: any = {
      code: form.code.trim(),
      type: form.type,
      amount: form.amount,
      is_active: form.is_active,
      for_first_order: form.for_first_order,
      start_date: calToISO(form.start_date),
      end_date: calToISO(form.end_date),
      usage_limit: form.usage_limit || undefined,
      min_order_amount: form.min_order_amount || undefined,
      max_discount_amount: form.max_discount_amount || undefined,
    };

    try {
      if (isEditMode) {
        await updateCoupon.mutateAsync(payload);
      } else {
        await createCoupon.mutateAsync(payload);
      }
      router.push("/admin/store/promotions/discount-code");
    } catch (err) {
      console.error("Coupon submit failed:", err);
    }
  };

  const handleReset = () => {
    setForm({
      code: "",
      type: "percent",
      amount: undefined,
      min_order_amount: undefined,
      max_discount_amount: undefined,
      usage_limit: undefined,
      start_date: null,
      end_date: null,
      is_active: true,
      for_first_order: false,
    });
    setTouched(false);
  };

  const loading = isEditMode ? updateCoupon.isPending : createCoupon.isPending;

  return (
    <div className="flex flex-col gap-6">
      <BackToPage
        title="بازگشت به لیست کدهای تخفیف"
        link="/admin/store/promotions/discount-code"
      />

      <Card className="shadow-md">
        <BoxHeader
          title={isEditMode ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
          color="bg-slate-100"
          icon={<LuTicket className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-6 mt-4">
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
              isRequired
            />

            {/* سایر ورودی‌ها */}
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <PriceNumberInput
                value={form.min_order_amount}
                onChange={(v) => updateForm("min_order_amount", v || undefined)}
                label="حداقل مبلغ سفارش"
                placeholder="مثلاً 100,000"
                suffix="تومان"
                isRequired={false}
              />

              <PriceNumberInput
                value={form.max_discount_amount}
                onChange={(v) =>
                  updateForm("max_discount_amount", v || undefined)
                }
                label="سقف تخفیف"
                placeholder="مثلاً 50,000"
                suffix="تومان"
                isRequired={false}
              />

              <PriceNumberInput
                value={form.usage_limit}
                onChange={(v) => updateForm("usage_limit", v || undefined)}
                label="محدودیت تعداد استفاده"
                placeholder="مثلاً 100"
                suffix="عدد"
                isRequired={false}
              />
            </div>
          </div>

          {/* تاریخ‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="تاریخ شروع اعتبار"
              labelPlacement="outside"
              showMonthAndYearPickers
              variant="bordered"
              value={form.start_date ?? undefined}
              onChange={(val: any) => updateForm("start_date", val ?? null)}
            />
            <DatePicker
              label="تاریخ پایان اعتبار"
              labelPlacement="outside"
              showMonthAndYearPickers
              variant="bordered"
              value={form.end_date ?? undefined}
              onChange={(val: any) => updateForm("end_date", val ?? null)}
            />
          </div>

          {/* وضعیت‌ها */}
          <div className="flex flex-wrap gap-6">
            <Switch
              isSelected={form.is_active}
              onValueChange={(v) => updateForm("is_active", v)}
              color="success"
              size="sm"
            >
              فعال باشد
            </Switch>

            <Switch
              isSelected={form.for_first_order}
              onValueChange={(v) => updateForm("for_first_order", v)}
              color="secondary"
              size="sm"
            >
              فقط برای اولین سفارش
            </Switch>
          </div>

          {/* دکمه‌ها */}
          <div className="flex items-center justify-end gap-2">
            {!isEditMode && (
              <Button
                variant="flat"
                color="default"
                onPress={handleReset}
                isDisabled={loading}
              >
                پاک‌سازی فرم
              </Button>
            )}

            <Button
              color="secondary"
              variant="solid"
              isLoading={loading}
              onPress={handleSubmit}
            >
              {isEditMode ? "ویرایش کد تخفیف" : "ثبت کد تخفیف"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
