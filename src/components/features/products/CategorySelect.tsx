"use client";

import React, { useMemo } from "react";
import { Select, SelectItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useGetAllCategories } from "@/hooks/api/categories/useCategory";
import { flattenCategories } from "@/utils/flattenCategories";
import SelectWithAddButton from "./create/helpers/SelectWithAddButton";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  label?: string;
  placeholder?: string;
  /** اگر true باشد، از کامپوننت SelectWithAddButton استفاده می‌کند */
  withAddButton?: boolean;
  /** زمانی استفاده می‌شود که کاربر روی دکمه افزودن کلیک کند */
  onAddNewClick?: () => void;
  /** در صورت نیاز برای خطای اعتبارسنجی */
  isActiveError?: boolean;
  /** حالت غیرفعال */
  isDisabled?: boolean;
};

const CategorySelect: React.FC<Props> = ({
  value,
  onChange,
  label = "دسته‌بندی",
  placeholder = "دسته‌بندی مورد نظر را انتخاب کنید",
  withAddButton = false,
  onAddNewClick,
  isActiveError = false,
  isDisabled = false,
}) => {
  // گرفتن داده‌ها از API
  const { data: categoriesData } = useGetAllCategories();

  // تخت کردن ساختار درختی دسته‌ها
  const flatOptions = useMemo(() => {
    return flattenCategories(categoriesData?.data);
  }, [categoriesData?.data]);

  // اگر گزینه افزودن فعال نباشد → Select معمولی
  if (!withAddButton) {
    return (
      <Select
        dir="rtl"
        labelPlacement="outside"
        label={label}
        placeholder={placeholder}
        startContent={<FiSearch className="text-lg pointer-events-none" />}
        selectedKeys={value ? [String(value)] : []}
        isDisabled={isDisabled}
        onSelectionChange={(keys) => {
          const val = Array.from(keys)[0] as string | undefined;
          onChange(val ?? null);
        }}
      >
        {flatOptions.length ? (
          flatOptions.map((opt) => (
            <SelectItem key={String(opt.id)}>{opt.title}</SelectItem>
          ))
        ) : (
          <SelectItem key="-1" isDisabled>
            آیتمی موجود نیست
          </SelectItem>
        )}
      </Select>
    );
  }

  // در غیر این صورت از SelectWithAddButton استفاده کن
  return (
    <SelectWithAddButton
      label={label}
      placeholder={placeholder}
      options={flatOptions}
      selectedId={value ? Number(value) : ""}
      onChange={(id) => onChange(id ?? null)}
      onAddNewClick={onAddNewClick ?? (() => {})}
      isActiveError={isActiveError}
    />
  );
};

export default CategorySelect;
