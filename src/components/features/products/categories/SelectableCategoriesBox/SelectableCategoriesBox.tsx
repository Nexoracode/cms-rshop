"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { BiCategoryAlt } from "react-icons/bi";
import { Category } from "../category.types";
import CategoriesSelectionModal from "./CategoriesSelectionModal";
import { CategoryNode } from "../CategoryTree/CategoryTree";
import {
  CategoriesSelectionProvider,
  useCategoriesSelection,
} from "./CategoriesSelectionContext";

type Props = {
  onChange?: (ids: number[]) => void;
  initialCategories?: Category[];
};

const InnerSelectableCategoriesBox: React.FC<{ onChange?: (ids: number[]) => void }> = ({ onChange }) => {
  const { selectedCategories, removeCategory } = useCategoriesSelection();

  useEffect(() => {
    onChange?.(selectedCategories.map((c) => c.id));
  }, [selectedCategories]);

  return (
    <SelectionBox
      title="دسته‌بندی‌های انتخاب‌شده"
      icon={<BiCategoryAlt className="text-5xl" />}
      initial={selectedCategories}
      modal={<CategoriesSelectionModal />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedCategories.map((cat: Category) => (
          <CategoryNode
            key={cat.id}
            node={cat}
            chainTitles={[]}
            onDelete={removeCategory}
            disableAction
            showDeselectIcon
            disableShowChildren
          />
        ))}
      </div>
    </SelectionBox>
  );
};

const SelectableCategoriesBox: React.FC<Props> = ({
  initialCategories = [],
  onChange,
}) => {
  return (
    <CategoriesSelectionProvider initialCategories={initialCategories}>
      <InnerSelectableCategoriesBox onChange={onChange} />
    </CategoriesSelectionProvider>
  );
};

export default SelectableCategoriesBox;
