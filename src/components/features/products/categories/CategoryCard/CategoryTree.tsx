"use client";

import { Category } from "../category.types";
import CategoryNode from "./CategoryNode";

type CategoryTreeProps = {
  categories: Category[];
  onEdit?: (cat: Category) => void;
  selectedIds?: number[];
  onSelect?: (id: number, selected: boolean, category?: Category) => void;
  disableSelect?: boolean;
  disableAction?: boolean;
  disableShowChildren?: boolean;
  onDelete?: (id: number) => void; 
};

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onEdit = () => {},
  selectedIds = [],
  onSelect,
  disableSelect = false,
  disableAction = false,
  disableShowChildren = false,
  onDelete,
}) => {
  return (
    <div dir="rtl" className="flex flex-col items-center sm:items-stretch gap-3">
      {categories.map((cat) => (
        <CategoryNode
          key={cat.id}
          node={cat}
          chainTitles={[]}
          onEdit={onEdit}
          selectedIds={selectedIds}
          onSelect={onSelect}
          disableSelect={disableSelect}
          disableAction={disableAction}
          disableShowChildren={disableShowChildren}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryTree;
