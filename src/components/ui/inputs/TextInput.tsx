"use client";

import { useState } from "react";
import { Input, InputProps } from "@heroui/react";
import FieldErrorText from "@/components/forms/FieldErrorText";
import { sanitizeInput } from "@/core/utils/sanitizeInput";
import { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;

  placeholder?: string;
  description?: string | ReactNode;
  type?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;

  isRequired?: boolean;
  isActiveError?: boolean;
  errorText?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  size?: InputProps["size"];
  variant?: InputProps["variant"];
  color?: InputProps["color"];
  maxLength?: number;
  minLength?: number;

  /** کنترل قوانین ورودی */
  allowEnglishOnly?: boolean;
  allowSpaces?: boolean;
  allowSpecialChars?: boolean;
  allowedSpecialChars?: string[];
  allowNumbers?: boolean;
  allowChars?: boolean;

  /** ترازبندی‌ها */
  inputAlign?: "left" | "right"; // فقط متن خود input
  helperAlign?: "left" | "right"; // ارورها/توضیحات/هلپر
};

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  description,
  type = "text",
  startContent,
  endContent,
  className,
  isRequired = false,
  isActiveError = false,
  errorText,
  isInvalid,
  isDisabled = false,
  onBlur,
  onFocus,
  size = "md",
  variant = "flat",
  color = "default",
  maxLength,
  minLength,
  allowChars = true,

  allowEnglishOnly = true,
  allowSpaces = true,
  allowSpecialChars = false,
  allowedSpecialChars = [],
  allowNumbers = true,

  inputAlign = "right",
  helperAlign = "right",
}: Props) {
  const [localError, setLocalError] = useState<string>("");

  // تشخیص خودکار بر اساس type
  const shouldSkipSanitize = type === "email";
  const emailAllowedChars = ["@", ".", "_", "-", "+"];

  const handleValueChange = (next: string) => {
    let filteredValue = next;

    if (allowChars === false) {
      // فقط اعداد مجاز
      filteredValue = next.replace(/\D/g, "");
    }

    let out = filteredValue;
    let firstError = "";

    // اگر type=email باشد، sanitization را skip می‌کنیم
    if (!shouldSkipSanitize) {
      const sanitizeResult = sanitizeInput(filteredValue, {
        allowEnglishOnly,
        allowSpaces,
        allowSpecialChars,
        allowedSpecialChars,
        allowNumbers,
      });
      out = sanitizeResult.out;
      firstError = sanitizeResult.firstError || "";
    } else {
      // برای ایمیل، فقط اعتبارسنجی ساده انجام می‌دهیم
      const emailRegex = /^[a-zA-Z0-9@._+-]*$/;
      if (!emailRegex.test(next)) {
        firstError = "کاراکترهای غیرمجاز در ایمیل";
        out = next.replace(/[^a-zA-Z0-9@._+-]/g, "");
      }
    }

    if (firstError) setLocalError(firstError);
    else setLocalError("");

    onChange(out);
  };

  const showRequiredError =
    (isInvalid ?? (isActiveError && isRequired && !value.trim())) &&
    !localError;

  const finalIsInvalid = !!localError || showRequiredError;
  const finalErrorMessage = localError ? (
    <FieldErrorText error={localError} />
  ) : showRequiredError ? (
    <FieldErrorText error={errorText || `${label} الزامی است.`} />
  ) : undefined;

  // کلاس‌های تراز
  const inputTextAlignClass =
    inputAlign === "left" ? "text-left" : "text-right";
  const helperTextAlignClass =
    helperAlign === "left" ? "text-left" : "text-right";

  return (
    <Input
      label={label}
      labelPlacement="outside"
      type={type}
      placeholder={placeholder}
      value={value}
      onValueChange={handleValueChange}
      onBlur={onBlur}
      onFocus={onFocus}
      startContent={startContent}
      endContent={endContent}
      className={className}
      size={size}
      variant={variant}
      color={color}
      isDisabled={isDisabled}
      maxLength={maxLength}
      minLength={minLength}
      isRequired={isRequired}
      isInvalid={finalIsInvalid}
      errorMessage={finalErrorMessage}
      description={description}
      autoComplete="off"
      classNames={{
        input: inputTextAlignClass,
        label: "text-right",
        helperWrapper: `w-full ${helperTextAlignClass}`,
        errorMessage: helperTextAlignClass,
        description: helperTextAlignClass,
        inputWrapper: "rtl:direction-rtl",
      }}
    />
  );
}