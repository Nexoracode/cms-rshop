"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import TextInput from "@/components/ui/inputs/TextInput";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import SelectableCategoriesBox from "@/components/features/products/categories/SelectableCategoriesBox/SelectableCategoriesBox";
import SelectableProductsBox from "@/components/features/products/SelectableProduct/SelectableProductsBox";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import BaseCard from "@/components/ui/BaseCard";
import FormActionButtons from "@/components/common/FormActionButtons";
import Switch from "@/components/ui/Switch";
import { TbRosetteDiscount } from "react-icons/tb";
import { MdOutlineCleaningServices } from "react-icons/md";

export type CouponFormType = {
  code: string;
  percent_discount: number;
  amount_discount: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  usage_limit?: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  for_first_order: boolean;
  allowed_users: number[];
  allowed_products: number[];
  allowed_categories: number[];
};

const initialForm: CouponFormType = {
  code: "",
  percent_discount: 0,
  amount_discount: 0,
  min_order_amount: undefined,
  max_discount_amount: undefined,
  usage_limit: undefined,
  start_date: "",
  end_date: "",
  is_active: true,
  for_first_order: false,
  allowed_users: [],
  allowed_products: [],
  allowed_categories: [],
};

type CouponFormProps = {
  pageType: "create" | "category" | "product" | "customer";
  initialData?: any; // data from backend /admin/promotions/:id
  isLoading?: boolean;
  onReset?: () => void;
};

const CouponForm: React.FC<CouponFormProps> = ({
  pageType = "create",
  initialData,
  isLoading,
  onReset,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;
  const isEditMode = !!id;
  console.log(initialData);

  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState<CouponFormType>(initialForm);

  const createPromotion = CouponHooks.useCreate();
  const updatePromotion = CouponHooks.useUpdate(id || 0);

  const isShowLoader =
    isLoading ||
    (isEditMode ? updatePromotion.isPending : createPromotion.isPending);

  const updateForm = <K extends keyof CouponFormType>(
    key: K,
    value: CouponFormType[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code || "",
        percent_discount: initialData.percent_discount || 0,
        amount_discount: initialData.amount_discount || 0,
        min_order_amount: initialData.min_order_amount,
        max_discount_amount: initialData.max_discount_amount,
        usage_limit: initialData.usage_limit,
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
        is_active: initialData.is_active ?? true,
        for_first_order: initialData.for_first_order ?? false,
        allowed_users: initialData.allowed_users || [],
        allowed_products: initialData.allowed_products || [],
        allowed_categories: initialData.allowed_categories || [],
      });
    }
  }, [initialData]);

  const buildPayload = () => {
    const payload: any = {
      name: `Coupon ${form.code}`, // این مورد الزامی است
      code: form.code.trim(),
      type: "coupon", // همیشه coupon
      startsAt: form.start_date || null,
      endsAt: form.end_date || null,
      usageLimit: form.usage_limit ?? null,
      isActive: form.is_active ?? false,
      conditions: [],
      actions: [],
    };

    // Conditions
    if (form.min_order_amount)
      payload.conditions.push({
        type: "min_order_amount",
        minAmount: form.min_order_amount,
      });
    if (form.allowed_products.length)
      payload.conditions.push({
        type: "product",
        productIds: form.allowed_products,
      });
    if (form.allowed_categories.length)
      payload.conditions.push({
        type: "category",
        categoryIds: form.allowed_categories,
      });
    if (form.allowed_users.length)
      payload.conditions.push({ type: "user", userIds: form.allowed_users });
    if (form.for_first_order) payload.conditions.push({ type: "first_order" });

    // Actions
    if (form.percent_discount && form.percent_discount > 0) {
      const action: any = {
        type: "percent_discount",
        value: form.percent_discount,
      };
      if (form.max_discount_amount)
        action.meta = { maxDiscountAmount: form.max_discount_amount };
      payload.actions.push(action);
    } else {
      payload.actions.push({
        type: "amount_discount",
        value: form.amount_discount,
      });
    }

    return payload;
  };

  const handleSubmit = async () => {
    setTouched(true);
    if (!form.code.trim() || form.amount_discount <= 0) return;

    const payload = buildPayload();
    console.log(payload);

    try {
      if (isEditMode) {
        const resp = await updatePromotion.mutateAsync(payload);
        if (resp?.ok || resp?.data)
          router.push("/admin/store/promotions/coupon");
      } else {
        const resp = await createPromotion.mutateAsync(payload);
        if (resp?.ok || resp?.data) handleReset();
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

  const loading = isEditMode
    ? updatePromotion.isPending
    : createPromotion.isPending;

  return (
    <BaseCard
      wrapperContents
      CardHeaderProps={{
        title: isEditMode ? "ویرایش کد تخفیف" : "افزودن کد تخفیف",
        icon: <TbRosetteDiscount />,
        textBtn: "پاک سازی فرم",
        btnIcon: <MdOutlineCleaningServices />,
        onAdd: handleReset,
      }}
      isLoading={isShowLoader}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <TextInput
            label="نام کد تخفیف"
            placeholder="مثلاً کد تخفیف برای اولین سفارش"
            value={form.code}
            onChange={(val) => updateForm("code", val)}
            isRequired
            isActiveError={touched}
            allowEnglishOnly
            allowNumbers
            allowSpaces={false}
            allowSpecialChars
            allowedSpecialChars={["-", "_"]}
          />
          <TextInput
            label="کد تخفیف"
            placeholder="مثلاً FirstORrderUser"
            value={form.code}
            onChange={(val) => updateForm("code", val)}
            isRequired
            isActiveError={touched}
            allowEnglishOnly
            allowNumbers
            allowSpaces={false}
            allowSpecialChars
            allowedSpecialChars={["-", "_"]}
          />
        </div>

        <div className="flex items-center gap-4">
          <PriceNumberInput
            value={form.amount_discount ?? 0}
            onChange={(val) => {
              updateForm("amount_discount", val ?? 1);
            }}
            label="تخفیف درصدی"
            placeholder="مثلا 20%"
            suffix="درصد"
            max={100}
          />

          <PriceNumberInput
            value={form.percent_discount ?? 0}
            onChange={(val) => {
              updateForm("percent_discount", val ?? 1);
            }}
            label="تخفیف ثابت"
            placeholder="مثلا 50 هزارتومان"
            suffix="تومان"
          />
        </div>

        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PriceNumberInput
            value={form.max_discount_amount}
            onChange={(v) => updateForm("max_discount_amount", v || undefined)}
            label="سقف تخفیف"
            placeholder="مثلاً 50,000"
            suffix="تومان"
          />
          <PriceNumberInput
            value={form.usage_limit}
            onChange={(v) => updateForm("usage_limit", v || undefined)}
            label="محدودیت تعداد استفاده"
            placeholder="مثلاً 100"
            suffix="عدد"
          />
          <PriceNumberInput
            value={form.min_order_amount}
            onChange={(v) => updateForm("min_order_amount", v || undefined)}
            label="حداقل مبلغ سفارش"
            placeholder="مثلاً 100,000"
            suffix="تومان"
          />
          <IsoDatePicker
            label="بازه اعتبار کوپن"
            enableRange
            valueIsoRange={{ start: form.start_date, end: form.end_date }}
            onChangeIsoRange={(range) => {
              updateForm("start_date", range?.start ?? "");
              updateForm("end_date", range?.end ?? "");
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

      {pageType === "product" && (
        <SelectableProductsBox
          onChange={(ids) => updateForm("allowed_products", ids)}
        />
      )}
      {pageType === "category" && (
        <SelectableCategoriesBox
          onChange={(ids) => updateForm("allowed_categories", ids)}
        />
      )}
      {pageType === "customer" && (
        <SelectableUsersBox
          onChange={(ids) => updateForm("allowed_users", ids)}
        />
      )}

      <FormActionButtons
        cancelHref="/admin/store/promotions/coupon"
        onSubmit={handleSubmit}
        isSubmitting={loading}
        submitText={isEditMode ? "ویرایش کد تخفیف" : "ثبت کد تخفیف"}
      />
    </BaseCard>
  );
};

export default CouponForm;
