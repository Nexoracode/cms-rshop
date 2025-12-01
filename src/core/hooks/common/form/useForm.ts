"use client";

import { useCallback } from "react";
import { useFormCore } from "./useFormCore";

export const useForm = <T extends Record<string, any>>(
  initialForm: T,
  options: {
    runValidationOnChange?: boolean;
    onValidate?: (form: T) => Record<string, string>;
  } = {}
) => {
  const core = useFormCore(initialForm, options);

  const handleFieldChange = useCallback((field: keyof T, value: any) => {
    core.setData((prev: T) => {
      const newForm = { ...prev, [field]: value } as T;

      core.markFieldAsTouched("", String(field));

      if (core.shouldValidateLive) {
        core.runValidation(newForm);
      }

      return newForm;
    });
  }, [core]);

  const handleMultipleFieldsChange = useCallback((fields: Partial<T>) => {
    core.setData((prev: T) => {
      const newForm = { ...prev, ...fields };

      Object.keys(fields).forEach((key) => {
        core.markFieldAsTouched("", key);
      });

      if (core.shouldValidateLive) {
        core.runValidation(newForm);
      }

      return newForm;
    });
  }, [core]);

  const reset = useCallback((values?: T) => {
    core.setData(values ?? initialForm);
    core.resetForm();
  }, [core, initialForm]);

  return {
    form: core.data as T,
    errors: core.errors as Record<string, string>,
    hasSubmitted: core.hasSubmitted,

    setForm: core.setData,
    handleFieldChange,
    handleMultipleFieldsChange,
    canSubmit: core.validateAndShowErrors,
    reset,
  };
};