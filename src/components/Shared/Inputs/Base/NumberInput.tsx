"use client";

import FieldErrorText from "@/components/Helper/FieldErrorText";
import { caretFromDigitIndex, formatNumberWithCommas, normalizeDigits } from "@/utils/number";
import { Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number | null | undefined;
  onChange: (val: number | undefined) => void;
  label?: string;
  placeholder?: string;
  suffix?: string; // مثل تومان، درصد، عدد و غیره
  isRequired?: boolean;
  min?: number;
  max?: number;
  isActiveError?: boolean;
  errorMessage?: string;
};

export default function NumberInput({
  value,
  onChange,
  label,
  placeholder,
  suffix,
  isRequired = false,
  min,
  max,
  isActiveError,
  errorMessage,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [display, setDisplay] = useState<string>("");

  // همگام‌سازی مقدار props با نمایش
  useEffect(() => {
    if (value === null || value === undefined || isNaN(value as any)) {
      setDisplay("");
      return;
    }
    const s = String(Math.floor(Number(value)));
    setDisplay(formatNumberWithCommas(s));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const cursor = el.selectionStart ?? el.value.length;

    const rawNorm = normalizeDigits(el.value);
    const leftPart = rawNorm.slice(0, cursor);
    const leftDigitsCount = (leftPart.match(/\d/g) || []).length;

    let digits = rawNorm.replace(/[^\d]/g, "");

    // محدودیت min/max
    if (digits !== "") {
      let num = Number(digits);
      if (typeof min === "number" && num < min) num = min;
      if (typeof max === "number" && num > max) num = max;
      digits = String(num);
    }

    const nextDisplay = formatNumberWithCommas(digits);
    setDisplay(nextDisplay);
    onChange(digits === "" ? undefined : Number(digits));

    // بازگرداندن موقعیت کرسر
    requestAnimationFrame(() => {
      const pos = caretFromDigitIndex(nextDisplay, leftDigitsCount);
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

  const showError = isRequired && isActiveError && (!value || (typeof min === "number" && value < min));

  return (
    <Input
      ref={inputRef as any}
      dir="ltr"
      lang="en"
      inputMode="numeric"
      type="text"
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      isRequired={isRequired}
      value={display}
      onChange={handleChange}
      className="text-right"
      endContent={
        suffix ? (
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">{suffix}</span>
          </div>
        ) : null
      }
      autoComplete="off"
      isInvalid={showError}
      errorMessage={showError ? <FieldErrorText error={errorMessage || `${label || "عدد"} الزامی است`} /> : undefined}
    />
  );
}
