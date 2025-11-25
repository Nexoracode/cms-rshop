"use client";
import { useState } from "react";

interface UseFormHandlerOptions<T> {
  runValidationOnChange?: boolean;
  onValidate?: (form: T) => Record<string, string>;
}

export function useFormHandler<T extends Record<string, any>>(
  initialForm: T,
  options: UseFormHandlerOptions<T> = {}
) {
  const { runValidationOnChange = true, onValidate } = options;

  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialForm).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>)
  );

  const handleFieldChange = (field: keyof T, value: any) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    // هر بار که تغییر می‌کنه، touched اون فیلد true میشه
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (runValidationOnChange && onValidate) {
      const validation = onValidate(newForm);
      setErrors(validation);
    }
  };

  const validateForm = () => {
    if (!onValidate) return {};
    const validation = onValidate(form);
    setErrors(validation);
    return validation;
  };

  const canSubmit = () => {
    const validation = validateForm();
    return Object.keys(validation).length === 0;
  };

  return {
    form,
    errors,
    touched,      // همه فیلدها و وضعیت touched شون
    setForm,
    setErrors,
    handleFieldChange,
    validateForm,
    canSubmit,
  };
}
