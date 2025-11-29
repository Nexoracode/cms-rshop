"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/react";
import FieldErrorText from "@/components/forms/FieldErrorText";

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
  description?: React.ReactNode;

  /** optional add button (نمایان در کنار select) */
  addButton?: AddButtonProps | null;
  className?: string;
  errorMessage?: string;
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
  errorMessage,
  description,
  addButton = null,
  className,
}) => {
  // value ممکنه عدد باشه؛ فقط null/undefined رو به "" تبدیل کن
  const valueStr = value != null ? String(value) : "";

  return (
    <>
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
          isInvalid={!!errorMessage?.length}
          errorMessage={
            errorMessage?.length ? (
              <FieldErrorText error={errorMessage} />
            ) : undefined
          }
          description={description}
          className={className}
        >
          {options.length ? (
            options.map((o: any) => (
              <SelectItem key={String(o.key)}>{o.title}</SelectItem>
            ))
          ) : (
            <SelectItem key="-1" isDisabled>
              آیتمی موجود نیست
            </SelectItem>
          )}
        </Select>

{/*       {addButton && (
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
      )} */}
    </>
  );
};

export default SelectBox;
