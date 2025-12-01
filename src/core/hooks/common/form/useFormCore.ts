// src/hooks/form/useFormCore.ts
import { useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

export type ValidateFn<T> = (
  data: T
) => Record<string, string> | Record<string, string>[];

export function useFormCore<T>(
  initialData: T,
  options: {
    runValidationOnChange?: boolean;
    onValidate?: ValidateFn<T>;
  } = {}
) {
  const { runValidationOnChange = true, onValidate } = options;

  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ReturnType<ValidateFn<T>>>([] as any);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [touched, setTouched] = useState<any>(
    Array.isArray(initialData) ? initialData.map(() => ({})) : {}
  );

  // وقتی فیلدی تغییر کرد، touched می‌شه
  const markFieldAsTouched = useCallback(
    (path: number | string, field: string) => {
      setTouched((prev: any) => {
        if (Array.isArray(prev)) {
          const index = path as number;
          const item = prev[index] || {};
          const updatedItem = { ...item, [field]: true };
          return [
            ...prev.slice(0, index),
            updatedItem,
            ...prev.slice(index + 1),
          ];
        } else {
          return { ...prev, [field]: true };
        }
      });
    },
    []
  );

  // اجرای validation + فیلتر کردن خطاها بر اساس touched/hasSubmitted
  const runValidation = useCallback(
    (currentData: T) => {
      if (!onValidate) {
        setErrors(Array.isArray(initialData) ? [] : {});
        return;
      }

      const rawErrors = onValidate(currentData);

      const filterVisible = (
        itemErrors: Record<string, string>,
        index?: number
      ): Record<string, string> => {
        const visible: Record<string, string> = {};
        const touchedObj = Array.isArray(touched)
          ? touched[index ?? 0] || {}
          : touched;

        for (const field in itemErrors) {
          if (touchedObj[field] || hasSubmitted) {
            visible[field] = itemErrors[field];
          }
        }
        return visible;
      };

      const filteredErrors = Array.isArray(rawErrors)
        ? rawErrors.map((err, i) => filterVisible(err as any, i))
        : filterVisible(rawErrors as any);

      setErrors(filteredErrors as any);
      return filteredErrors;
    },
    [onValidate, touched, hasSubmitted, initialData]
  );

  const validateAndShowErrors = useCallback(() => {
    setHasSubmitted(true);
    runValidation(data);

    const hasVisibleError = Array.isArray(errors)
      ? errors.some((err) => Object.keys(err).length > 0)
      : Object.keys(errors).length > 0;

    if (hasVisibleError) {
      toast.error("لطفا خطاها را برطرف کنید");
      window.scrollTo({ top: 100, behavior: "smooth" });
    }

    return !hasVisibleError;
  }, [data, runValidation, errors]);

  const resetForm = useCallback(() => {
    setHasSubmitted(false);
    setTouched(Array.isArray(initialData) ? initialData.map(() => ({})) : {});
    setErrors(Array.isArray(initialData) ? [] : {});
  }, [initialData]);

  // فقط بعد از اولین submit، validation زنده فعال بشه (UX بهتر)
  const shouldValidateLive = runValidationOnChange && hasSubmitted;

  return {
    data,
    setData,
    errors,
    hasSubmitted,
    setHasSubmitted,
    markFieldAsTouched, // برای useForm و useListForm
    runValidation,
    validateAndShowErrors,
    shouldValidateLive,
    resetForm,
  };
}
