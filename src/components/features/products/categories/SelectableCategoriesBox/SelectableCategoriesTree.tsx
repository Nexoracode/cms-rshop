"use client";

import React from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { TbCategory2 } from "react-icons/tb";
import { useGetCategories } from "@/hooks/api/categories/useCategory";
import CategoryTree from "../CategoryCard/CategoryTree";
import AddNewCategoryModal from "../AddNewCategoryModal";
import { Category } from "../category.types";

type Props = {
    selectedIds: (number | string)[];
    onSelectionChange: (category: Category, selected: boolean) => void;
};

const SelectableCategoriesTree: React.FC<Props> = ({
    selectedIds,
    onSelectionChange,
}) => {
    const { data: categories, isLoading } = useGetCategories();
    const isExistItems = !!categories?.data?.length;

    const handleSelect = (id: number, selected: boolean, category?: Category) => {
        if (category) onSelectionChange(category, selected);
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
            meta={undefined}
        >
            <CategoryTree
                categories={categories?.data || []}
                selectedIds={selectedIds.map((id) => Number(id))}
                onSelect={handleSelect}
                disableAction
            />
        </UnifiedCard>
    );
};

export default SelectableCategoriesTree;
