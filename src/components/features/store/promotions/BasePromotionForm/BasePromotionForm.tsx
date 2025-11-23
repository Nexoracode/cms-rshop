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
import SelectableProductVariants from "@/components/features/products/SelectableProduct/SelectableProductVariants";
import SelectableProductsBox from "@/components/features/products/SelectableProduct/SelectableProductsBox";

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
  const [errors, setErrors] = useState<any>({});

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

  function validateForm(
    form: PromotionForm,
    config: PromotionFormConfig,
    scope: string
  ) {
    const errs: any = {};

    // name
    if (!form.name?.trim()) errs.name = "نام پروموشن الزامی است.";

    // code (اگر در config فعال است)
    if (config.code && !form.code?.trim()) {
      errs.code = "کد تخفیف الزامی است.";
    }

    // discount logic
    if (config.discount_fields) {
      if (!form.percent_discount && !form.amount_discount) {
        errs.discount = "حداقل یکی از درصد یا مبلغ تخفیف را وارد کنید.";
      }
    }

    // scope validations
    if (scope === "products" && config.scope.includes("product")) {
      if (!form.allowed_products || form.allowed_products.length === 0) {
        errs.allowed_products = "حداقل یک محصول باید انتخاب شود.";
      }
    }

    if (scope === "categories" && config.scope.includes("category")) {
      if (!form.allowed_categories || form.allowed_categories.length === 0) {
        errs.allowed_categories = "حداقل یک دسته‌بندی باید انتخاب شود.";
      }
    }

    if (scope === "customers" && config.scope.includes("user")) {
      if (!form.allowed_users || form.allowed_users.length === 0) {
        errs.allowed_users = "حداقل یک کاربر باید انتخاب شود.";
      }
    }

    return errs;
  }

  const handleSubmit = () => {
    setHasSubmitted(true);

    const errs = validateForm(form, config, scope);
    setErrors(errs);
    console.log(errs);

    if (Object.keys(errs).length > 0) return;

    /*   const payload = mapLocalFormToAPI(form, formType);
    onHandleSubmit(payload); */
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
          allowEnglishOnly={false}
          value={form.name}
          onChange={(val) => updateForm("name", val)}
          isRequired
          errorMessage={errors.name}
        />

        {config.code && (
          <TextInput
            label="کد"
            placeholder="مثلاً SUMMER2026"
            value={form.code || ""}
            onChange={(val) => updateForm("code", val)}
            isRequired
            errorMessage={errors.code}
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
              isRequired
              errorMessage={errors.discount}
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
        <SelectableProductsBox
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
