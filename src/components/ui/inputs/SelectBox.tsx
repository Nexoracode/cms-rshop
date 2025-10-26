// components/ui/inputs/SelectBox.tsx
"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/react";

export type SelectOption = {
  key: string | number;
  title: string;
};

type Props = {
  label: string;
  value: string | "" | undefined;
  onChange: (val: string) => void;

  /** لیست گزینه‌ها */
  options: SelectOption[];

  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";
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
}) => {
  return (
    <Select
      dir="rtl"
      label={label}
      labelPlacement="outside"
      selectedKeys={value ? [String(value)] : []}
      placeholder={placeholder ?? "انتخاب کنید"}
      onSelectionChange={(keys) => {
        const val = Array.from(keys)[0] as string | undefined;
        onChange(val ?? "");
      }}
      isDisabled={disabled}
      size={size}
      variant={variant}
    >
      {options.length ? (
        options.map((o) => (
          <SelectItem key={String(o.key)}>{o.title}</SelectItem>
        ))
      ) : (
        <SelectItem key="-1" isDisabled>
          آیتمی موجود نیست
        </SelectItem>
      )}
    </Select>
  );
};

export default SelectBox;
