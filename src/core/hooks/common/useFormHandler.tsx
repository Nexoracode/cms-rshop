"use client";
import { useState } from "react";

interface UseFormHandlerOptions<T> {
  runValidationOnChange?: boolean; // آیا هنگام تغییر فیلد ولیدیشن اجرا شود
  onValidate?: (form: T) => Record<string, string>; // ولیدیشن سفارشی
}

export function useFormHandler<T extends Record<string, any>>(
  initialForm: T,
  options: UseFormHandlerOptions<T> = {}
) {
  const { runValidationOnChange = true, onValidate } = options;

  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // تغییر مقدار یک فیلد
  const handleFieldChange = (field: keyof T, value: any) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    if (runValidationOnChange && onValidate) {
      const validation = onValidate(newForm);
      setErrors(validation);
    }
  };

  // ولیدیشن کامل فرم و برگشت خطاها
  const validateForm = () => {
    if (!onValidate) return {};
    const validation = onValidate(form);
    setErrors(validation);
    return validation;
  };

  // بررسی قبل از submit
  const canSubmit = () => {
    const validation = validateForm();
    return Object.keys(validation).length === 0;
  };

  return {
    form,
    errors,
    setForm,
    setErrors,
    handleFieldChange,
    validateForm,
    canSubmit,
  };
}
