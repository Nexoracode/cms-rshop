"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import TextInput from "@/components/ui/inputs/TextInput";
import { LuTicket } from "react-icons/lu";
import { useCreateCoupon, useUpdateCoupon } from "@/core/hooks/api/useCoupon";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import SelectableCategoriesBox from "@/components/features/products/categories/SelectableCategoriesBox/SelectableCategoriesBox";
import {
  CouponFormType,
  CouponPayload,
} from "@/components/features/store/promotions/coupon/coupon-types";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import BaseCard from "@/components/ui/BaseCard";
import FormActionButtons from "@/components/common/FormActionButtons";
import { MdOutlineCleaningServices } from "react-icons/md";
import Switch from "@/components/ui/Switch";

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
  pageType: "create" | "category" | "product" | "customer";
  initialData?: CouponFormType;
  isLoading?: boolean;
  onReset?: () => void
};

const CouponForm: React.FC<CouponFormProps> = ({
  pageType = "create",
  initialData,
  isLoading,
  onReset
}) => {
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
  //
  const isShowLoader =
    isLoading || (isEditMode ? updateCoupon.isPending : createCoupon.isPending);

  const updateForm = <K extends keyof CouponPayload>(
    key: K,
    value: CouponPayload[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

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
      ...(pageType === "customer"
        ? { allowed_user_ids: form.allowed_user_ids }
        : {}),
    };
    console.log(payload);

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
    onReset?.();
    setForm(initialForm);
    setTouched(false);
  };

  const loading = isEditMode ? updateCoupon.isPending : createCoupon.isPending;

  return (
    <>
      <BaseCard
        wrapperContents
        CardHeaderProps={{
          title: isEditMode ? "ویرایش کد تخفیف" : "افزودن کد تخفیف",
          icon: <LuTicket />,
          textBtn: "پاک سازی فرم",
          btnIcon: <MdOutlineCleaningServices />,
          onAdd: handleReset,
        }}
        isLoading={isShowLoader}
      >
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
            placeholder={form.type === "percent" ? "مثلاً 10" : "مثلاً 50,000"}
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

            <IsoDatePicker
              label="بازه اعتبار کوپن"
              enableRange
              valueIsoRange={{
                start: form.start_date,
                end: form.end_date,
              }}
              onChangeIsoRange={(range) => {
                updateForm("start_date", range?.start ?? null);
                updateForm("end_date", range?.end ?? null);
              }}
              showMonthAndYearPickers
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <Switch
            isSelected={form.is_active}
            onValueChange={(v) => updateForm("is_active", v)}
            color="success"
          >
            فعال باشد
          </Switch>

          <Switch
            isSelected={form.for_first_order}
            onValueChange={(v) => updateForm("for_first_order", v)}
            color="secondary"
          >
            فقط برای اولین سفارش
          </Switch>
        </div>

        {pageType === "category" && (
          <SelectableCategoriesBox
            onChange={(ids) =>
              ids.length && updateForm("allowed_category_ids", ids)
            }
          />
        )}

        {pageType === "customer" && (
          <SelectableUsersBox
            onChange={(ids) => {
              ids.length && updateForm("allowed_user_ids", ids);
            }}
          />
        )}

        <FormActionButtons
          cancelHref="/admin/store/promotions/coupon"
          onSubmit={handleSubmit}
          isSubmitting={loading}
          submitText={isEditMode ? "ویرایش کد تخفیف" : "ثبت کد تخفیف"}
        />
      </BaseCard>
    </>
  );
};

export default CouponForm;
