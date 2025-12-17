"use client";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import FieldErrorText from "@/components/forms/FieldErrorText";

type EmailInputProps = {
  value: string;
  onChange: (email: string, isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailInput({
  value,
  onChange,
  label = "ایمیل",
  placeholder = "example@mail.com",
  isRequired = false,
}: EmailInputProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // ⏱ حذف خودکار ارور
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!touched) setTouched(true);

    // ❌ space
    if (/\s/.test(raw)) {
      setError("فاصله در ایمیل مجاز نیست");
      return;
    }

    // ❌ غیرلاتین (فارسی، عربی، ایموجی...)
    if (/[^\x00-\x7F]/.test(raw)) {
      setError("فقط کاراکترهای لاتین مجاز هستند");
      return;
    }

    // ❌ کاراکتر غیرمجاز ایمیل
    if (/[^a-zA-Z0-9@._+\-]/.test(raw)) {
      setError("فقط حروف انگلیسی، عدد و @ . _ + - مجاز هستند");
      return;
    }

    // ✅ اوکی
    setError(null);
    const isValid =
      raw.length > 0 ? emailRegex.test(raw) : !isRequired;

    onChange(raw, isValid);
  };

  const showError =
    touched &&
    (error || (isRequired && value.trim().length === 0));

  const finalErrorMessage =
    error ||
    (isRequired && touched && value.trim().length === 0
      ? "وارد کردن ایمیل الزامی است"
      : null);

  return (
    <Input
      style={{ direction: "ltr" }}
      labelPlacement="outside"
      label={label}
      placeholder={placeholder}
      isRequired={isRequired}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      type="email"
      size="md"
      isInvalid={!!showError}
      errorMessage={
        showError ? (
          <FieldErrorText error={finalErrorMessage!} />
        ) : undefined
      }
    />
  );
}
