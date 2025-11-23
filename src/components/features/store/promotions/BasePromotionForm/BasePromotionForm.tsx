"use client";

import React, { useEffect, useState } from "react";
//? Components
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import Switch from "@/components/ui/Switch";
import FormActionButtons from "@/components/common/FormActionButtons";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
//? Selectable
import SelectableProductsBoxWithQuantity from "@/components/features/products/SelectableProduct/SelectableProductsBoxWithQuantity";
import SelectableCategoriesBox from "@/components/features/products/categories/SelectableCategoriesBox/SelectableCategoriesBox";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox"
//? Hook
import { createFormUpdater } from "@/core/hooks/common/useFormUpdater";
//? Icon
import { TbRosetteDiscount } from "react-icons/tb";
import { MdOutlineCleaningServices } from "react-icons/md";
//? Other
import { mapAPIToLocalForm, mapLocalFormToAPI } from "./promotions-helpers";
import { FORM_CONFIGS } from "./form-configs-promotions";
import {
  PromotionAPI,
  PromotionForm,
  PromotionFormConfig,
} from "../promotions-types";

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

    const payload = mapLocalFormToAPI(form, formType);
    console.log(payload);
    //onHandleSubmit(payload);
  };

  return (
    <BaseCard
      wrapperContents
      CardHeaderProps={{
        title: isEditMode ? "ویرایش" : `افزودن`,
        icon: <TbRosetteDiscount />,
        textBtn: "پاک سازی فرم",
        btnIcon: <MdOutlineCleaningServices />,
        onAdd: handleResetLocal,
      }}
      isLoading={isShowLoader}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextInput
          label="نام پروموشن"
          placeholder="مثلاً تخفیف تابستانه"
          value={form.name}
          onChange={(val) => updateForm("name", val)}
          isRequired
          isActiveError={hasSubmitted}
        />

        {config.code && (
          <TextInput
            label="کد"
            value={form.code || ""}
            onChange={(val) => updateForm("code", val)}
            placeholder="مثلاً SUMMER2026"
            isRequired
            isActiveError={hasSubmitted}
          />
        )}

        {config.discount_fields && (
          <>
            <PriceNumberInput
              value={form.percent_discount ?? 0}
              onChange={(val) => updateForm("percent_discount", val ?? 0)}
              label="درصد تخفیف"
              placeholder="مثلاً 20"
              suffix="%"
              max={100}
              isActiveError={hasSubmitted}
              isRequired
              errorMessage="درصد تخفیف الزامی است."
            />

            <PriceNumberInput
              value={form.amount_discount ?? 0}
              onChange={(val) => updateForm("amount_discount", val ?? 0)}
              label="تخفیف مبلغی"
              placeholder="مثلاً 50000"
              suffix="تومان"
            />
          </>
        )}

        {config.usage_limit && (
          <PriceNumberInput
            value={form.usage_limit}
            onChange={(val) => updateForm("usage_limit", val || undefined)}
            label="محدودیت تعداد استفاده"
            placeholder="تعداد دفعاتی که این پروموشن می‌تواند استفاده شود"
            suffix="عدد"
          />
        )}

        {config.min_order_amount && (
          <PriceNumberInput
            value={form.min_order_amount}
            onChange={(val) => updateForm("min_order_amount", val || undefined)}
            label="حداقل مبلغ سفارش"
            placeholder="حداقل مبلغ سفارش برای اعمال تخفیف"
            suffix="تومان"
          />
        )}

        {config.max_discount_amount && (
          <PriceNumberInput
            value={form.max_discount_amount}
            onChange={(val) =>
              updateForm("max_discount_amount", val || undefined)
            }
            label="سقف تخفیف"
            placeholder="حداکثر مبلغ تخفیف قابل اعمال"
            suffix="تومان"
          />
        )}

        {config.date_range && (
          <IsoDatePicker
            label="بازه اعتبار"
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

      <div className="mt-6">
        <Switch
          isSelected={form.is_active}
          onValueChange={(v) => updateForm("is_active", v)}
          color="success"
        >
          فعال باشد
        </Switch>
      </div>

      {scope === "products" && config.scope.includes("product") && (
        <SelectableProductsBoxWithQuantity
          onChange={(items) => updateForm("allowed_products", items)}
          error={
            hasSubmitted && form.allowed_products?.length === 0 ? true : false
          }
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
          error={
            hasSubmitted && form.allowed_users?.length === 0 ? true : false
          }
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
