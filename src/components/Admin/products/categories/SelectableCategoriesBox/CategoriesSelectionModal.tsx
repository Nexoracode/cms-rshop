"use client";

import React from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/ui/modals/Modal";
import { useGetCategories } from "@/hooks/api/categories/useCategory";
import { TbCategory2 } from "react-icons/tb";
import CategoryTree from "../CategoryCard";
import { useSelectableItems } from "@/hooks/ui/useSelectableItems";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedCategories: any[]) => void;
  selectedIds?: number[];
};

const CategoriesSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedIds = [],
}) => {
  const { data: categoriesResponse, isLoading } = useGetCategories();
  const categories = categoriesResponse?.data ?? [];

  const {
    selectedOrder,
    handleSelect,
    handleConfirm: handleConfirmSelection,
  } = useSelectableItems(categories, selectedIds, isOpen);

  const handleConfirm = () => {
    const selectedCategories = handleConfirmSelection();
    onConfirm(selectedCategories);
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="انتخاب دسته‌بندی"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={handleConfirm}
      icon={<TbCategory2 className="text-2xl" />}
      size="3xl"
    >
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner
              label="در حال بارگذاری دسته‌بندی‌ها..."
              color="secondary"
            />
          </div>
        ) : categories.length ? (
          <CategoryTree
            categories={categories}
            selectedIds={selectedOrder}
            onSelect={(id, selected, category) =>
              category && handleSelect(category, !!selected)
            }
            disableAction
          />
        ) : (
          <p className="text-center text-gray-500 py-8">
            دسته‌بندی‌ای برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </DynamicModal>
  );
};

export default CategoriesSelectionModal;
