"use client";

import BaseModal from "@/components/ui/modals/BaseModal";
import { TbCategory2 } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import AddNewCategoryModal from "../AddNewCategoryModal";
import { useGetCategories } from "@/core/hooks/api/categories/useCategory";
import { useCategoriesSelection } from "./CategoriesSelectionContext";
import { CategoryTree } from "../CategoryTree/CategoryTree";

const CategoriesSelectionModal: React.FC = () => {
  const { selectedCategories, addCategory, removeCategory } =
    useCategoriesSelection();

  const { data: categories, isLoading } = useGetCategories();

  const isExistItems = !!categories?.data?.length;

  const handleSelectionChange = (category: any, selected: boolean) => {
    if (selected) addCategory(category);
    else removeCategory(category.id);
  };

  return (
    <BaseModal
      title="انتخاب دسته‌بندی‌ها"
      icon={<TbCategory2 className="text-2xl"/>}
      isActiveFooter={false}
      size="3xl"
    >
      <UnifiedCard
        headerProps={{
          title: "انتخاب دسته‌بندی‌ها",
          icon: <TbCategory2 className="text-2xl" />,
          children: <AddNewCategoryModal />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={false}
        //meta={categories?.data?.meta}
        childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {categories?.data && (
          <CategoryTree categories={categories.data} selectable disableAction onSelectionChange={handleSelectionChange}/>
        )}
      </UnifiedCard>
    </BaseModal>
  );
};

export default CategoriesSelectionModal;
