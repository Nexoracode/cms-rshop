"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useGetCategories } from "@/hooks/api/categories/useCategory";
import { Category } from "../category.types";
import AddNewCategoryModal from "../AddNewCategoryModal";
import { TbCategory2 } from "react-icons/tb";
import { CategoryTree } from "../CategoryTree";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { findItemById } from "@/utils/findItemById";

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

    const mergedSelectedIds = useMemo(
        () => [...initialCategories, ...selectedIds].map((id) => Number(id)),
        [initialCategories, selectedIds]
    );

    const [selectedIdsState, setSelectedIdsState] = useState<number[]>([]);

    useEffect(() => {
        setSelectedIdsState(mergedSelectedIds);
    }, [mergedSelectedIds]);

    const handleSelectionChange = (ids: number[]) => {
        setSelectedIdsState(ids);

        // دسته‌هایی که انتخاب شدند
        ids.forEach((id) => {
            const category = findItemById(categories?.data || [], id);
            if (category) onSelectionChange(category, true);
        });

        // دسته‌هایی که از حالت انتخاب خارج شدند
        selectedIdsState.forEach((prevId) => {
            if (!ids.includes(prevId)) {
                const category = findItemById(categories?.data || [], prevId);
                if (category) onSelectionChange(category, false);
            }
        });
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
            {categories?.data && (
                <CategoryTree
                    categories={categories.data}
                    selectable
                    selectedIds={selectedIdsState}
                    onSelectionChange={handleSelectionChange}
                    disableAction
                />
            )}
        </UnifiedCard>
    );
};

export default SelectableCategoriesTree;
