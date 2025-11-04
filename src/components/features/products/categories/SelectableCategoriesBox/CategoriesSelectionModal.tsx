"use client";

import React, { useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbCategory2 } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import AddNewCategoryModal from "../AddNewCategoryModal";
import { useGetCategories } from "@/core/hooks/api/categories/useCategory";
import { useCategoriesSelection } from "./CategoriesSelectionContext";
import { CategoryTree } from "../CategoryTree/CategoryTree";

const CategoriesSelectionModal: React.FC = () => {
  const { selectedCategories, addCategory, removeCategory } = useCategoriesSelection();

  const { data: categories, isLoading } = useGetCategories();
  const isExistItems = !!categories?.data?.length;

  // فقط id های انتخاب شده
  const selectedIds = useMemo(
    () => selectedCategories.map((c) => c.id),
    [selectedCategories]
  );

  // وقتی کاربر چک کرد یا آنچک کرد
  const handleTreeSelectionChange = (ids: number[]) => {
    const allCategories = categories?.data || [];

    // اضافه کردن جدیدها
    ids.forEach((id) => {
      if (!selectedIds.includes(id)) {
        const cat = allCategories.find((c: any) => c.id === id);
        if (cat) addCategory(cat);
      }
    });

    // حذف کردن قبلی‌ها
    selectedIds.forEach((prevId) => {
      if (!ids.includes(prevId)) {
        removeCategory(prevId);
      }
    });
  };

  return (
    <BaseModal
      title="انتخاب دسته‌بندی‌ها"
      icon={<TbCategory2 className="text-2xl" />}
      isActiveFooter={false}
      size="3xl"
    >
      <UnifiedCard
        headerProps={{
          title: "انتخاب دسته‌بندی‌ها",
          icon: <TbCategory2 className="text-2xl" />,
          children: <AddNewCategoryModal />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={false}
        childrenClassName="space-y-4"
      >
        {categories?.data && (
          <CategoryTree
            categories={categories.data}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={handleTreeSelectionChange}
            disableAction
          />
        )}
      </UnifiedCard>
    </BaseModal>
  );
};

export default CategoriesSelectionModal;