"use client";
import { useState } from "react";

export function useFormHandler<T extends Record<string, any>>(
  initialForm: T,
  validate: (form: T) => Record<string, string>,
) {
  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: keyof T, value: any) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    // real-time validation
    const validation = validate(newForm);
    setErrors(validation);
  };

  const validateForm = () => {
    const validation = validate(form);
    setErrors(validation);
    return validation;
  };

  return { form, errors, handleFieldChange, setForm, setErrors, validateForm };
}
