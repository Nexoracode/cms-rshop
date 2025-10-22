"use client";

import React, { useEffect, useState } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { BiCategoryAlt } from "react-icons/bi";
import CategoriesSelectionModal from "./CategoriesSelectionModal";
import CategoryTree from "../CategoryCard";

type Category = any;

type Props = {
  onChange?: (categories: Category[]) => void;
  initialCategories?: Category[];
};

const SelectableCategoriesBox: React.FC<Props> = ({
  onChange,
  initialCategories = [],
}) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>([]);

  useEffect(() => {
    if (!initialCategories.length) return;
    setSelectedCategories(initialCategories);
  }, [initialCategories]);

  const handleConfirm = (categories: Category[]) => {
    setSelectedCategories(categories);
    onChange?.(categories.length ? categories.map((p) => p.id) : []);
    setIsUsersOpen(false);
  };

  return (
    <SelectionBox
      title="دسته‌بندی‌ها انتخاب‌شده"
      icon={<BiCategoryAlt className="text-5xl" />}
      initial={selectedCategories}
      onOpen={() => setIsUsersOpen(true)}
      modal={
        <CategoriesSelectionModal
          isOpen={isUsersOpen}
          onOpenChange={setIsUsersOpen}
          onConfirm={handleConfirm}
          selectedIds={selectedCategories.map((c) => c.id)}
        />
      }
    >
      <div className="flex flex-col gap-4">
        <CategoryTree
          categories={selectedCategories}
          disableSelect
          disableAction
          disableShowChildren
        />
      </div>
    </SelectionBox>
  );
};

export default SelectableCategoriesBox;
