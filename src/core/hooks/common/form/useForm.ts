// src/hooks/form/useForm.ts
import { useCallback, useState } from "react";
import { useFormCore } from "./useFormCore";

export function useForm<T extends Record<string, any>>(
  initialForm: T,
  options: {
    runValidationOnChange?: boolean;
    onValidate?: (form: T) => Record<string, string>;
  } = {}
) {
  const core = useFormCore(initialForm, options);

  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialForm).reduce(
      (acc, k) => ({ ...acc, [k]: false }),
      {} as any
    )
  );

  const handleFieldChange = (field: keyof T, value: any) => {
    core.setData((prev) => {
      const newForm = { ...prev, [field]: value };
      if (core.shouldValidateLive) core.runValidation(newForm);
      return newForm;
    });
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const reset = useCallback(
    (values?: T) => {
      const newValues = values ?? initialForm;
      core.setData(newValues);
      setTouched(
        Object.keys(newValues).reduce(
          (acc, k) => ({ ...acc, [k]: false }),
          {} as any
        )
      );
      core.setErrors({} as any);
      core.setHasSubmitted(false);
    },
    [core, initialForm]
  );

  return {
    form: core.data,
    errors: core.errors as Record<string, string>,
    touched,
    hasSubmitted: core.hasSubmitted,
    setForm: core.setData,
    handleFieldChange,
    handleMultipleFieldsChange: (fields: Partial<T>) => {
      core.setData((prev) => {
        const newForm = { ...prev, ...fields };
        if (core.shouldValidateLive) core.runValidation(newForm);
        return newForm;
      });
      setTouched((prev) => ({
        ...prev,
        ...Object.keys(fields).reduce((acc, k) => ({ ...acc, [k]: true }), {}),
      }));
    },
    canSubmit: core.validateAndShowErrors,
    reset,
  };
}
