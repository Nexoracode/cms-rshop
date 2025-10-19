"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Switch, Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import BackToPage from "@/components/Helper/BackToPage";
import PriceNumberInput from "@/components/Shared/Inputs/Base/NumberInput";
import NumberWithSelect from "@/components/Shared/Inputs/NumberWithSelect";
import TextInput from "@/components/Shared/Inputs/Base/TextInput";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { LuTicket } from "react-icons/lu";
import {
  useCreateCoupon,
  useUpdateCoupon,
  useGetOneCoupon,
} from "@/hooks/api/useCoupon";
import SelectableProductsBox from "@/components/Admin/_products/SelectableProductsBox/SelectableProductsBox";
import SelectableUsersBox from "@/components/Admin/_store/__customers/SelectableUsersBox/SelectableUsersBox";
import SelectableCategoriesBox from "@/components/Admin/_products/__categories/SelectableCategoriesBox/SelectableCategoriesBox";
import {
  CouponFormType,
  CouponPayload,
} from "@/components/Admin/_store/__promotions/___coupon/coupon-types";
import IsoDatePicker from "@/components/Shared/Inputs/IsoDatePicker";

const initialForm: CouponFormType = {
  code: "",
  type: "percent",
  amount: 0,
  min_order_amount: undefined,
  max_discount_amount: undefined,
  usage_limit: undefined,
  start_date: "",
  end_date: "",
  is_active: true,
  for_first_order: false,
  // Optional
  allowed_users: [],
  allowed_products: [],
  allowed_categories: [],
};

type CouponFormProps = {
  pageType: "create" | "category" | "product" | "user";
};

const CouponForm: React.FC<CouponFormProps> = ({ pageType = "create" }) => {
  const router = useRouter();
  const params = useSearchParams();

  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;
  const isEditMode = !!id;
  // States
  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState(initialForm);
  //? Hooks
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon(id || 0);
  const { data: couponData } = useGetOneCoupon(id);

  const updateForm = <K extends keyof CouponPayload>(
    key: K,
    value: CouponPayload[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!couponData?.data) return;
    console.log(couponData?.data);
    setForm(couponData?.data);
  }, [couponData]);

  const handleSubmit = async () => {
    setTouched(true);

    if (!(form.code.trim().length > 0 && form.amount > 0)) return;

    const payload: CouponPayload = {
      code: form.code.trim(),
      type: form.type,
      amount: form.amount,
      is_active: form.is_active,
      for_first_order: form.for_first_order,
      start_date: form.start_date,
      end_date: form.end_date,
      usage_limit: form.usage_limit || undefined,
      min_order_amount: form.min_order_amount || undefined,
      max_discount_amount: form.max_discount_amount || undefined,
      ...(pageType === "category"
        ? { allowed_category_ids: form.allowed_category_ids }
        : {}),
      ...(pageType === "product"
        ? { allowed_product_ids: form.allowed_product_ids }
        : {}),
      ...(pageType === "user"
        ? { allowed_user_ids: form.allowed_user_ids }
        : {}),
    };

    try {
      if (isEditMode) {
        const updatedCoupon = await updateCoupon.mutateAsync(payload);
        if (updatedCoupon.ok) {
          router.push("/admin/store/promotions/coupon");
        }
      } else {
        const createdInfo = await createCoupon.mutateAsync(payload);
        if (createdInfo.ok) {
          handleReset();
        }
      }
    } catch (err) {
      console.error("Coupon submit failed:", err);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setTouched(false);
  };

  const loading = isEditMode ? updateCoupon.isPending : createCoupon.isPending;

  console.log(couponData);

  return (
    <div className="flex flex-col gap-6">
      <BackToPage
        title="بازگشت به لیست کدهای تخفیف"
        link="/admin/store/promotions/coupon"
      />

      <Card className="shadow-md">
        <BoxHeader
          title={isEditMode ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
          color="bg-slate-100"
          icon={<LuTicket className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-6 mt-4">
          {pageType === "category" ? (
            <SelectableCategoriesBox
              initialCategories={couponData?.data?.allowed_categories || []}
              onChange={(ids) =>
                ids.length && updateForm("allowed_category_ids", ids)
              }
            />
          ) : (
            ""
          )}

          {pageType === "user" ? (
            <SelectableUsersBox
              initialUsers={couponData?.data?.allowed_users || []}
              onChange={(ids) =>
                ids.length && updateForm("allowed_user_ids", ids)
              }
            />
          ) : (
            ""
          )}

          {pageType === "product" ? (
            <SelectableProductsBox
              initialProducts={couponData?.data?.allowed_products || []}
              onChange={(ids) =>
                ids.length && updateForm("allowed_product_ids", ids)
              }
            />
          ) : (
            ""
          )}

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
            <NumberWithSelect
              label="مقدار تخفیف"
              placeholder={
                form.type === "percent" ? "مثلاً 10" : "مثلاً 50,000"
              }
              maxValue={form.type === "percent" ? 100 : undefined}
              value={form.amount ?? 0}
              onValueChange={(val) =>
                updateForm("amount", val === undefined ? 1 : val)
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IsoDatePicker
              label="تاریخ شروع اعتبار"
              valueIso={form.start_date}
              onChangeIso={(val) => updateForm("start_date", val ?? null)}
            />

            <IsoDatePicker
              label="تاریخ پایان اعتبار"
              valueIso={form.end_date}
              onChangeIso={(val) => updateForm("end_date", val ?? null)}
            />
          </div>

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
};

export default CouponForm;
