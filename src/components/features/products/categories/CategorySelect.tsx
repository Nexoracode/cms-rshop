"use client";

import React, { useMemo } from "react";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import { useGetAllCategories } from "@/hooks/api/categories/useCategory";
import { flattenCategories } from "@/utils/flattenCategories";
import AddNewCategoryModal from "./AddNewCategoryModal";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  label?: string;
  placeholder?: string;
  withAddButton?: boolean;
  onAddNewClick?: () => void;
  isActiveError?: boolean;
  isDisabled?: boolean;
  withAddModal?: boolean; // ✅ جدید
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
  withAddModal = false, // مقدار پیش‌فرض
}) => {
  const { data: categoriesData } = useGetAllCategories();

  const flatOptions: SelectOption[] = useMemo(() => {
    return (flattenCategories(categoriesData?.data) || []).map((opt) => ({
      key: String(opt.id),
      title: opt.title,
    }));
  }, [categoriesData?.data]);

  return (
    <>
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
        addButton={
          withAddButton && onAddNewClick
            ? { onClick: onAddNewClick, label: "+ افزودن" }
            : undefined
        }
        isActiveError={isActiveError}
      />

      {/* ✅ فقط وقتی با prop فعال شد */}
      {withAddModal && <AddNewCategoryModal />}
    </>
  );
};

export default CategorySelect;
