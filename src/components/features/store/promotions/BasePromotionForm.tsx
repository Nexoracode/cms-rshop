"use client";

import React, { useEffect, useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import { MdOutlineCleaningServices } from "react-icons/md";
import { TbRosetteDiscount } from "react-icons/tb";
import SelectableCategoriesBox from "../../products/categories/SelectableCategoriesBox/SelectableCategoriesBox";
import SelectableUsersBox from "../customers/SelectableCustomersBox/SelectableCustomersBox";
import FormActionButtons from "@/components/common/FormActionButtons";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import Switch from "@/components/ui/Switch";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
import { FORM_CONFIGS } from "./form-configs-promotions";
import {
  PromotionAPI,
  PromotionForm,
  PromotionFormConfig,
} from "./promotions-types";
import { mapAPIToLocalForm, mapLocalFormToAPI } from "./promotions-helpers";
import toast from "react-hot-toast";
import SelectableProductsBoxWithQuantity from "../../products/SelectableProduct/SelectableProductsBoxWithQuantity";
import { createFormUpdater } from "@/core/hooks/common/useFormUpdater";

interface BasePromotionFormProps {
  formType: keyof typeof FORM_CONFIGS;
  scope?: "general" | "products" | "categories" | "customers";
  initialData?: any; // backend shape when editing
  isEditMode?: boolean;
  isShowLoader?: boolean;
  onHandleSubmit: (payload: PromotionAPI) => void; // parent handles API
  onHandleReset?: () => void; // optional hook parent wants
  loading?: boolean;
  onResetSuccess?: () => void;
  resetSignal?: number;
}

const initialLocalForm: PromotionForm = {
  name: "",
  code: "",
  percent_discount: 0,
  amount_discount: 0,
  usage_limit: undefined,
  min_order_amount: undefined,
  max_discount_amount: undefined,
  start_date: "",
  end_date: "",
  is_active: true,
  first_order: false,
  allowed_users: [],
  allowed_products: [],
  allowed_categories: [],
};

export function BasePromotionForm({
  formType,
  scope = "general",
  initialData,
  isEditMode = false,
  isShowLoader = false,
  onHandleSubmit,
  onHandleReset,
  loading = false,
  resetSignal,
}: BasePromotionFormProps) {
  const config: PromotionFormConfig = FORM_CONFIGS[formType];

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [form, setForm] = useState<PromotionForm>(initialLocalForm);
  const updateForm = createFormUpdater(setForm);

  useEffect(() => {
    if (initialData) {
      setForm(mapAPIToLocalForm(initialData, formType));
    } else if (formType === "first_order") {
      setForm((prev) => ({ ...prev, first_order: true }));
    }
  }, [initialData, formType]);

  useEffect(() => {
    setForm(initialLocalForm);
    setHasSubmitted(false);
  }, [resetSignal]);

  const handleResetLocal = () => {
    setForm(initialLocalForm);
    setHasSubmitted(false);
    onHandleReset?.();
  };

  const handleSubmit = () => {
    setHasSubmitted(true);

    // validations
    if (formType === "coupon" && !form.code?.trim()) {
      return toast.error("کد تخفیف الزامی است");
    }
    if (!form.name?.trim()) {
      return toast.error("نام پروموشن الزامی است");
    }
    const hasAnyAction =
      (form.percent_discount ?? 0) > 0 ||
      (form.amount_discount ?? 0) > 0 ||
      formType === "free_shipping" ||
      formType === "next_order_reward";
    if (!hasAnyAction)
      return toast.error("حداقل یک نوع تخفیف یا اکشن باید تعریف شود");

    const payload = mapLocalFormToAPI(form, formType);
    onHandleSubmit(payload);
  };

  return (
    <BaseCard
      wrapperContents
      CardHeaderProps={{
        title: isEditMode ? "ویرایش پروموشن" : `افزودن ${formType}`,
        icon: <TbRosetteDiscount />,
        textBtn: "پاک سازی فرم",
        btnIcon: <MdOutlineCleaningServices />,
        onAdd: handleResetLocal,
      }}
      isLoading={isShowLoader}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextInput
          label="نام پروموشن (name)"
          value={form.name}
          onChange={(val) => updateForm("name", val)}
          placeholder="مثلاً 20% OFF Electronics"
          isRequired
          isActiveError={hasSubmitted}
        />

        {config.code && (
          <TextInput
            label="کد (code)"
            value={form.code || ""}
            onChange={(val) => updateForm("code", val)}
            placeholder="مثلاً SUMMER2025"
            isRequired
            isActiveError={hasSubmitted}
          />
        )}

        {config.discount_fields && (
          <>
            <PriceNumberInput
              value={form.percent_discount ?? 0}
              onChange={(val) => updateForm("percent_discount", val ?? 0)}
              label="درصد تخفیف (percent_discount)"
              suffix="%"
              max={100}
            />

            <PriceNumberInput
              value={form.amount_discount ?? 0}
              onChange={(val) => updateForm("amount_discount", val ?? 0)}
              label="تخفیف مبلغی (amount_discount)"
              suffix="تومان"
            />
          </>
        )}

        {config.usage_limit && (
          <PriceNumberInput
            value={form.usage_limit}
            onChange={(val) => updateForm("usage_limit", val || undefined)}
            label="محدودیت تعداد استفاده (usage_limit)"
            suffix="عدد"
          />
        )}

        {config.min_order_amount && (
          <PriceNumberInput
            value={form.min_order_amount}
            onChange={(val) => updateForm("min_order_amount", val || undefined)}
            label="حداقل مبلغ سفارش (min_order_amount)"
            suffix="تومان"
          />
        )}

        {config.max_discount_amount && (
          <PriceNumberInput
            value={form.max_discount_amount}
            onChange={(val) =>
              updateForm("max_discount_amount", val || undefined)
            }
            label="سقف تخفیف (max_discount_amount)"
            suffix="تومان"
          />
        )}

        {config.date_range && (
          <IsoDatePicker
            label="بازه اعتبار (startsAt / endsAt)"
            enableRange
            valueIsoRange={{ start: form.start_date, end: form.end_date }}
            onChangeIsoRange={(range) => {
              updateForm("start_date", range?.start ?? "");
              updateForm("end_date", range?.end ?? "");
            }}
            showMonthAndYearPickers
            className="w-full"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-6 mt-6">
        <Switch
          isSelected={form.is_active}
          onValueChange={(v) => updateForm("is_active", v)}
          color="success"
        >
          فعال باشد (isActive)
        </Switch>

        {config.first_order && (
          <Switch
            isSelected={form.first_order}
            onValueChange={(v) => updateForm("first_order", v)}
            color="secondary"
          >
            فقط برای اولین سفارش (first_order)
          </Switch>
        )}
      </div>

      {scope === "products" && config.scope.includes("product") && (
        <SelectableProductsBoxWithQuantity
          onChange={(items) => updateForm("allowed_products", items)}
        />
      )}

      {scope === "categories" && config.scope.includes("category") && (
        <SelectableCategoriesBox
          onChange={(ids) => updateForm("allowed_categories", ids)}
          error={
            hasSubmitted && form.allowed_categories?.length === 0 ? true : false
          }
        />
      )}

      {scope === "customers" && config.scope.includes("user") && (
        <SelectableUsersBox
          onChange={(ids) => updateForm("allowed_users", ids)}
        />
      )}

      <FormActionButtons
        cancelHref="/admin/store/promotions"
        onSubmit={handleSubmit}
        isSubmitting={loading}
        submitText={isEditMode ? "ویرایش" : "ثبت"}
      />
    </BaseCard>
  );
}

export default BasePromotionForm;
