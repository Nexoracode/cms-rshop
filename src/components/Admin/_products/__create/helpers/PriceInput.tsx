"use client";

import FieldErrorText from "@/components/Helper/FieldErrorText";
import { Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number | null | undefined;
  onChange: (val: number) => void;
  label?: string;
  placeholder?: string;
  suffix?: string; // مثلا "تومان"
  required?: boolean;
  min?: number;
  max?: number;
};

function normalizeDigits(str: string) {
  // تبدیل ارقام فارسی/عربی به انگلیسی
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return str.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (d) => {
    const iFa = fa.indexOf(d);
    if (iFa > -1) return String(iFa);
    const iAr = ar.indexOf(d);
    if (iAr > -1) return String(iAr);
    return d;
  });
}

function formatWithCommas(digits: string) {
  if (!digits) return "";
  // حذف صفرهای پیشرو غیر ضروری
  const trimmed = digits.replace(/^0+(?=\d)/, "");
  return trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function caretFromDigitIndex(formatted: string, digitIndex: number) {
  if (digitIndex <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      seen++;
      if (seen === digitIndex) {
        // کرسر باید بعد از همین رقم قرار بگیرد
        return i + 1;
      }
    }
  }
  return formatted.length;
}

export default function PriceNumberInput({
  value,
  onChange,
  label = "قیمت",
  placeholder = "10,000",
  suffix = "تومان",
  required,
  min,
  max,
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
    setDisplay(formatWithCommas(s));
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
    const nextDisplay = formatWithCommas(digits);
    setDisplay(nextDisplay);

    // 5) مقدار عددی خالص برای والد
    onChange(digits === "" ? 0 : Number(digits));

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
      isRequired={required}
      value={display}
      onChange={handleChange}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">{suffix}</span>
        </div>
      }
      // جلوگیری از autocomplete موبایل
      autoComplete="off"
      errorMessage={
        <FieldErrorText error={!value ? "قیمت الزامی است" : null} />
      }
      description={<FieldErrorText error={!value ? "قیمت الزامی است" : null} />}
    />
  );
}
