"use client";

import React, { useMemo } from "react";
import { useGetCategories } from "@/core/hooks/api/categories/useCategory";
import { Category } from "../category.types";
import AddNewCategoryModal from "../AddNewCategoryModal";
import { TbCategory2 } from "react-icons/tb";
import { CategoryTree } from "../CategoryTree/CategoryTree";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { findItemById } from "@/core/utils/findItemById";

type Props = {
  selectedIds: (number | string)[];
  onSelectionChange: (category: Category, selected: boolean) => void;
  initialCategories?: (number | string)[];
};

const SelectableCategoriesTree: React.FC<Props> = ({
  selectedIds,
  onSelectionChange,
  initialCategories = [],
}) => {
  const { data: categories, isLoading } = useGetCategories();
  const isExistItems = !!categories?.data?.length;

  // ترکیب دسته‌های اولیه و انتخاب‌شده
  const mergedSelectedIds = useMemo(
    () =>
      Array.from(
        new Set([...initialCategories, ...selectedIds].map(Number))
      ),
    [initialCategories, selectedIds]
  );

  const handleSelectionChange = (ids: number[]) => {
    const allCategories = categories?.data || [];

    // دسته‌هایی که انتخاب شدند
    ids.forEach((id) => {
      const category = findItemById(allCategories, id);
      if (category) onSelectionChange(category, true);
    });

    // دسته‌هایی که از حالت انتخاب خارج شدند
    mergedSelectedIds.forEach((prevId) => {
      if (!ids.includes(prevId)) {
        const category = findItemById(allCategories, prevId);
        if (category) onSelectionChange(category, false);
      }
    });
  };

  return (
    <UnifiedCard
      headerProps={{
        title: "انتخاب دسته‌بندی‌ها",
        icon: <TbCategory2 className="text-2xl" />,
        children: <AddNewCategoryModal />,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={false}
    >
      
    </UnifiedCard>
  );
};

export default SelectableCategoriesTree;
