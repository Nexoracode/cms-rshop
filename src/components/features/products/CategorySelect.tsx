"use client";

import React, { useMemo } from "react";
import { Select, SelectItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useGetAllCategories } from "@/hooks/api/categories/useCategory";
import { flattenCategories } from "@/utils/flattenCategories";
import SelectWithAddButton from "./create/helpers/SelectWithAddButton";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  label?: string;
  placeholder?: string;
  withAddButton?: boolean;
  onAddNewClick?: () => void;
  isActiveError?: boolean;
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
  const { data: categoriesData } = useGetAllCategories();

  const flatOptions: SelectOption[] = useMemo(() => {
    return (flattenCategories(categoriesData?.data) || []).map((opt) => ({
      key: String(opt.id),
      title: opt.title,
    }));
  }, [categoriesData?.data]);

  if (!withAddButton) {
    return (
      <SelectBox
        label={label}
        value={value ? String(value) : ""}
        onChange={(val) => onChange(val ?? null)}
        options={
          flatOptions.length
            ? flatOptions
            : [{ key: "-1", title: "آیتمی موجود نیست" }]
        }
        placeholder={placeholder}
        disabled={isDisabled}
        size="md"
      />
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
