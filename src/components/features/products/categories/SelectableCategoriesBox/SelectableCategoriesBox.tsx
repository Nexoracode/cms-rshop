"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { Category } from "../category.types";
import CategoriesSelectionModal from "./CategoriesSelectionModal";
import { CategoryNode } from "../CategoryTree/CategoryTree";
import { useCategoriesSelection } from "./CategoriesSelectionContext";
import { TbCategory2 } from "react-icons/tb";

type Props = {
  onChange?: (ids: number[]) => void;
};

const InnerSelectableCategoriesBox: React.FC<{
  onChange?: (ids: number[]) => void;
}> = ({ onChange }) => {
  const { selectedCategories, removeCategory } = useCategoriesSelection();

  useEffect(() => {
    onChange?.(selectedCategories.map((c) => c.id));
  }, [selectedCategories]);

  return (
    <SelectionBox
      title="دسته‌بندی‌های انتخاب‌شده"
      icon={<TbCategory2 className="text-5xl" />}
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

const SelectableCategoriesBox: React.FC<Props> = ({ onChange }) => {
  return <InnerSelectableCategoriesBox onChange={onChange} />;
};

export default SelectableCategoriesBox;
