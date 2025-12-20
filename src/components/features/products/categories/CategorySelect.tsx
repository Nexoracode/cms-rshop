"use client";

import React, { useMemo } from "react";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import { useGetAllCategories } from "@/core/hooks/api/categories/useCategory";
import { flattenCategories } from "@/core/utils/flattenCategories";
import AddNewCategoryModal from "./AddNewCategoryModal";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  label?: string;
  placeholder?: string;
  withAddButton?: boolean;
  onAddNewClick?: () => void;
  errorMessage?: string;
  isDisabled?: boolean;
  withAddModal?: boolean; // ✅ جدید
  isRequired?: boolean;
};

const CategorySelect: React.FC<Props> = ({
  value,
  onChange,
  label = "دسته‌بندی",
  placeholder = "دسته‌بندی مورد نظر را انتخاب کنید",
  withAddButton = false,
  onAddNewClick,
  errorMessage,
  isDisabled = false,
  withAddModal = false, // مقدار پیش‌فرض
  isRequired = false,
}) => {
  const { data: categoriesData } = useGetAllCategories();

  const flatOptions: SelectOption[] = useMemo(() => {
    return (flattenCategories(categoriesData?.data?.items) || []).map((opt) => ({
      key: String(opt.id),
      title: opt.title,
    }));
  }, [categoriesData?.data?.items]);

  return (
    <div
      className={`w-full flex ${
        errorMessage?.length ? "items-center" : "items-end"
      } gap-2`}
    >
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
        errorMessage={errorMessage}
        isRequired={isRequired}
      />

      {/* ✅ فقط وقتی با prop فعال شد */}
      {withAddModal && <AddNewCategoryModal />}
    </div>
  );
};

export default CategorySelect;
