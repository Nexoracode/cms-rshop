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
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFieldChange = (field: keyof T, value: any) => {
    // use functional update to avoid lost updates when calling this function multiple times synchronously
    setForm((prev) => {
      const newForm = { ...prev, [field]: value };
      // run validation on the new form if required
      if (runValidationOnChange && onValidate && hasSubmitted) {
        const validation = onValidate(newForm);
        setErrors(validation);
      }
      return newForm;
    });

    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    if (!onValidate) return {};
    const validation = onValidate(form);
    setErrors(validation);
    return validation;
  };

  const canSubmit = () => {
    setHasSubmitted(true); // submit زده شد
    const validation = validateForm();
    return Object.keys(validation).length === 0;
  };

  return {
    form,
    errors,
    touched,
    hasSubmitted,
    setForm,
    setHasSubmitted,
    setErrors,
    handleFieldChange,
    validateForm,
    canSubmit,
  };
}
