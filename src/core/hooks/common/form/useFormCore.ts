import { useState, useCallback } from "react";
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

  const runValidation = useCallback(
    (currentData: T) => {
      if (!onValidate) return [] as any;
      const result = onValidate(currentData);
      setErrors(result);
      return result;
    },
    [onValidate]
  );

  const validateAndShowErrors = useCallback(() => {
    setHasSubmitted(true);
    const validationErrors = runValidation(data);

    const hasError = Array.isArray(validationErrors)
      ? validationErrors.some((err) => Object.keys(err).length > 0)
      : Object.keys(validationErrors).length > 0;

    if (hasError) {
      toast.error("لطفا خطاها را برطرف کنید");
      window.scrollTo({ top: 100, behavior: "smooth" });
    }

    return !hasError;
  }, [data, runValidation]);

  return {
    data,
    setData,
    errors,
    setErrors,
    hasSubmitted,
    setHasSubmitted,
    runValidation,
    validateAndShowErrors,
    shouldValidateLive: runValidationOnChange && hasSubmitted,
  };
}
