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
  suffix?: string; // مثلا "تومان"
  isRequired?: boolean;
  min?: number;
  max?: number;
  isActiveError?: boolean;
};

export default function PriceNumberInput({
  value,
  onChange,
  label = "قیمت",
  placeholder = "10,000",
  suffix = "تومان",
  isRequired = true,
  min = 0,
  max,
  isActiveError,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [display, setDisplay] = useState<string>("");

  // هم‌سو کردن مقدار بیرونی (مثلا از API) با نمایش
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
    // موقعیت فعلی کرسر قبل از پردازش
    const cursor = el.selectionStart ?? el.value.length;

    // 1) نرمال‌سازی ورودی خام
    const rawNorm = normalizeDigits(el.value);

    // 2) تعداد رقم‌های سمت چپ کرسر فعلی (برای بازسازی محل کرسر بعد از فرمت)
    const leftPart = rawNorm.slice(0, cursor);
    const leftDigitsCount = (leftPart.match(/\d/g) || []).length;

    // 3) استخراج فقط رقم‌ها
    let digits = rawNorm.replace(/[^\d]/g, "");

    // محدودیت min/max (اختیاری و سبک)
    if (digits !== "") {
      let num = Number(digits);
      if (typeof min === "number" && num < min) num = min;
      if (typeof max === "number" && num > max) num = max;
      digits = String(num);
    }

    // 4) فرمت نمایش
    const nextDisplay = formatNumberWithCommas(digits);
    setDisplay(nextDisplay);

    // 5) مقدار عددی خالص برای والد
    onChange(digits === "" ? undefined : Number(digits));

    // 6) بازگردانی کرسر بر اساس تعداد رقم‌های سمت چپ
    requestAnimationFrame(() => {
      const pos = caretFromDigitIndex(nextDisplay, leftDigitsCount);
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

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
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">{suffix}</span>
        </div>
      }
      autoComplete="off"
      isInvalid={isRequired && isActiveError && (!value || +value < min)}
      errorMessage={
        isRequired && isActiveError && (!value || +value < min) ? (
          <FieldErrorText error={`قیمت الزامی است`} />
        ) : undefined
      }
    />
  );
}
