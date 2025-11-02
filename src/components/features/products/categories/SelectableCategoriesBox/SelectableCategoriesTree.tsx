"use client";

import React from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { TbCategory2 } from "react-icons/tb";
import { useGetCategories } from "@/hooks/api/categories/useCategory";
import AddNewCategoryModal from "../AddNewCategoryModal";
import SelectableCard from "@/components/ui/SelectableCard";
import CategoryNode from "../CategoryCard/CategoryNode";
import { Category } from "../category.types";

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

    // ترکیب دسته‌های اولیه + دسته‌های انتخاب‌شده
    const mergedSelectedIds = [...initialCategories, ...selectedIds].map((id) =>
        Number(id)
    );

    // handler وقتی یک کارت انتخاب یا غیرفعال می‌شود
    const handleSelect = (id: number, selected: boolean, category?: Category) => {
        if (!category) return;
        onSelectionChange(category, selected);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories?.data?.map((category: Category) => (
                    <SelectableCard
                        key={category.id}
                        id={Number(category.id)}
                        selectedIds={mergedSelectedIds}
                        onSelectionChange={(id, selected) =>
                            handleSelect(Number(id), selected, category)
                        }
                    >
                        <CategoryNode
                            node={category}
                            chainTitles={[]}
                            onEdit={() => { }}
                            selectedIds={mergedSelectedIds}
                            onSelect={handleSelect}
                            disableAction
                        />
                    </SelectableCard>
                ))}
            </div>
        </UnifiedCard>
    );
};

export default SelectableCategoriesTree;
