"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbCategory2 } from "react-icons/tb";
import { useCategoriesSelection } from "./CategoriesSelectionContext";
import { Category } from "../category.types";
import SelectableCategoriesTree from "./SelectableCategoriesTree";

const CategoriesSelectionModal: React.FC = () => {
  const { selectedCategories, setCategories } = useCategoriesSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<Category[]>(selectedCategories);

  useEffect(() => {
    if (isOpen) setTempSelected(selectedCategories);
  }, [isOpen, selectedCategories]);

  const handleSelectionChange = (category: Category, selected: boolean) => {
    setTempSelected((prev) =>
      selected
        ? [...prev.filter((c) => c.id !== category.id), category]
        : prev.filter((c) => c.id !== category.id)
    );
  };

  const handleConfirm = () => {
    setCategories(tempSelected);
    setIsOpen(false);
  };

  return (
    <BaseModal
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      title="انتخاب دسته‌بندی‌ها"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      icon={<TbCategory2 />}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onConfirm={handleConfirm}
      onCancel={() => setIsOpen(false)}
      size="3xl"
    >
      <SelectableCategoriesTree
        selectedIds={tempSelected.map((c) => c.id)}
        onSelectionChange={handleSelectionChange}
      />
    </BaseModal>
  );
};

export default CategoriesSelectionModal;
