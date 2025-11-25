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
import SelectableCategoriesBox from "@/components/features/products/categories/SelectableCategoriesBox/SelectableCategoriesBox";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import SelectableProductsBox from "@/components/features/products/SelectableProduct/SelectableProductsBox";
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
import { useFormHandler } from "@/core/hooks/common/useFormHandler";

interface BasePromotionFormProps {
  formType: keyof typeof FORM_CONFIGS;
  scope?: "general" | "products" | "categories" | "customers";
  initialData?: any;
  isEditMode?: boolean;
  isShowLoader?: boolean;
  onHandleReset?: () => void;
  loading?: boolean;
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
  onHandleReset,
  loading = false,
  resetSignal,
}: BasePromotionFormProps) {
  const config: PromotionFormConfig = FORM_CONFIGS[formType];
  const {
    form,
    errors,
    handleFieldChange,
    canSubmit,
    setForm,
    setHasSubmitted,
  } = useFormHandler<PromotionForm>(initialLocalForm, {
    onValidate: (f) => validatePromotionForm(f),
    runValidationOnChange: true,
  });

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

  const validatePromotionForm = (form: PromotionForm) => {
    const errs: Record<string, string> = {};

    if (!form.name?.trim()) errs.name = "نام پروموشن الزامی است.";

    if (config.code && !form.code?.trim()) errs.code = "کد تخفیف الزامی است.";

    if (config.discount_fields) {
      if (!form.percent_discount && !form.amount_discount)
        errs.discount = "حداقل یکی از درصد یا مبلغ تخفیف را وارد کنید.";
    }

    if (scope === "products" && config.scope.includes("product")) {
      if (!form.allowed_products || form.allowed_products.length === 0)
        errs.allowed_products = "حداقل یک محصول باید انتخاب شود.";
    }

    if (scope === "categories" && config.scope.includes("category")) {
      if (!form.allowed_categories || form.allowed_categories.length === 0)
        errs.allowed_categories = "حداقل یک دسته‌بندی باید انتخاب شود.";
    }

    if (scope === "customers" && config.scope.includes("user")) {
      if (!form.allowed_users || form.allowed_users.length === 0)
        errs.allowed_users = "حداقل یک کاربر باید انتخاب شود.";
    }

    return errs;
  };

  const handleSubmit = () => {
    console.log(errors);

    if (!canSubmit()) return;

    const payload = mapLocalFormToAPI(form, formType);
    console.log(payload);
    //onHandleSubmit(payload);
  };

  const handleResetLocal = () => {
    setForm(initialLocalForm);
    setHasSubmitted(false);
    onHandleReset?.();
  };

  return (
    <BaseCard
      wrapperContents
      CardHeaderProps={{
        title: isEditMode ? "ویرایش" : "افزودن",
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
          allowEnglishOnly={false}
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          isRequired
          errorMessage={errors.name}
        />

        {config.code && (
          <TextInput
            label="کد"
            placeholder="مثلاً SUMMER2026"
            value={form.code || ""}
            onChange={(val) => handleFieldChange("code", val)}
            isRequired
            errorMessage={errors.code}
          />
        )}

        {config.discount_fields && (
          <>
            <TextInput
              label="درصد تخفیف"
              placeholder="مثلاً 20"
              value={String(form.percent_discount)}
              onChange={(val) => handleFieldChange("percent_discount", val)}
              allowNumbers
              maxLength={2}
              isRequired
              errorMessage={errors.discount}
            />
            <PriceNumberInput
              value={form.amount_discount ?? 0}
              onChange={(val) => handleFieldChange("amount_discount", val)}
              label="تخفیف مبلغی"
              placeholder="مثلاً 50000"
              suffix="تومان"
            />
          </>
        )}

        {config.usage_limit && (
          <PriceNumberInput
            value={form.usage_limit}
            onChange={(val) => handleFieldChange("usage_limit", val)}
            label="محدودیت تعداد استفاده"
            placeholder="عدد"
            suffix="عدد"
          />
        )}

        {config.min_order_amount && (
          <PriceNumberInput
            value={form.min_order_amount}
            onChange={(val) => handleFieldChange("min_order_amount", val)}
            label="حداقل مبلغ سفارش"
            placeholder="تومان"
            suffix="تومان"
          />
        )}

        {config.max_discount_amount && (
          <PriceNumberInput
            value={form.max_discount_amount}
            onChange={(val) => handleFieldChange("max_discount_amount", val)}
            label="سقف تخفیف"
            placeholder="تومان"
            suffix="تومان"
          />
        )}

        <IsoDatePicker
          label="بازه اعتبار"
          enableRange
          valueIsoRange={{ start: form.start_date, end: form.end_date }}
          onChangeIsoRange={(range) => {
            handleFieldChange("start_date", range?.start);
            handleFieldChange("end_date", range?.end);
          }}
          showMonthAndYearPickers
          className="w-full"
        />
      </div>

      <div className="mt-6">
        <Switch
          isSelected={form.is_active}
          onValueChange={(v) => handleFieldChange("is_active", v)}
          color="success"
        >
          فعال باشد
        </Switch>
      </div>

      {scope === "products" && config.scope.includes("product") && (
        <SelectableProductsBox
          onChange={(items) => handleFieldChange("allowed_products", items)}
          error={!!errors.allowed_products}
        />
      )}

      {scope === "categories" && config.scope.includes("category") && (
        <SelectableCategoriesBox
          onChange={(ids) => handleFieldChange("allowed_categories", ids)}
          error={!!errors.allowed_categories}
        />
      )}

      {scope === "customers" && config.scope.includes("user") && (
        <SelectableUsersBox
          onChange={(ids) => handleFieldChange("allowed_users", ids)}
          error={!!errors.allowed_users?.length}
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
