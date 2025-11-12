// components/ui/inputs/SelectBox.tsx
"use client";

import React, { useMemo } from "react";
import { Select, SelectItem } from "@heroui/react";

export type SelectOption = {
  key: string | number;
  title: string;
};

type MaybeOldOption = {
  id?: string | number;
  title: string;
};

type AddButtonProps = {
  label?: string; // default: "+ افزودن"
  onClick: (e: React.MouseEvent) => void;
  className?: string;
};

/** Props عمومی و دقیقِ SelectBox */
type Props = {
  label: string;
  value: string | "" | undefined | number | null; // قبول 0
  onChange: (val: string) => void;

  /** لیست گزینه‌ها: یا SelectOption یا { id, title } (برای سازگاری) */
  options: (SelectOption | MaybeOldOption)[];

  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";

  /** UI extras (مثل SelectWithAddButton سابق) */
  startContent?: React.ReactNode;
  isRequired?: boolean;
  isActiveError?: boolean;
  errorText?: string;
  description?: React.ReactNode;

  /** optional add button (نمایان در کنار select) */
  addButton?: AddButtonProps | null;
  className?: string;
};

const SelectBox: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  size = "md",
  variant = "flat",
  startContent,
  isRequired = false,
  isActiveError = false,
  errorText,
  description,
  addButton = null,
  className,
}) => {
  // value ممکنه عدد باشه؛ فقط null/undefined رو به "" تبدیل کن
  const valueStr = value != null ? String(value) : "";

  return (
    <div className={`flex items-center gap-2 w-full ${className ?? ""}`}>
      <div className="flex-1">
        <Select
          dir="rtl"
          label={label}
          labelPlacement="outside"
          startContent={startContent}
          selectedKeys={valueStr ? [valueStr] : []}
          placeholder={placeholder ?? "انتخاب کنید"}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string | undefined;
            onChange(val ?? "");
          }}
          isDisabled={disabled}
          size={size}
          variant={variant}
          isRequired={isRequired}
          errorMessage={
            isActiveError && errorText ? <span>{errorText}</span> : undefined
          }
          description={description}
        >
          {options.length ? (
            options.map((o: any) => (
              <SelectItem key={String(o.key)}>
                {o.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem key="-1" isDisabled>
              آیتمی موجود نیست
            </SelectItem>
          )}
        </Select>
        {isRequired && isActiveError && !valueStr && (
          <p className="mt-1 text-red-500 text-sm">
            {errorText ?? `${label} الزامی است.`}
          </p>
        )}
      </div>

      {addButton && (
        <button
          type="button"
          onClick={addButton.onClick}
          className={
            addButton.className ??
            "w-24 text-center text-purple-700 bg-purple-200 rounded-xl py-1.5"
          }
        >
          {addButton.label ?? "+ افزودن"}
        </button>
      )}
    </div>
  );
};

export default SelectBox;
