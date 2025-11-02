"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { BiCategoryAlt } from "react-icons/bi";
import { Category } from "../category.types";
import CategoriesSelectionModal from "./CategoriesSelectionModal";
import CategoryTree from "../CategoryCard/CategoryTree";
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
      <div className="flex flex-col gap-4">
        <CategoryTree
          categories={selectedCategories}
          disableSelect
          disableAction
          disableShowChildren
          onDelete={removeCategory}
        />
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
