"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { TbCategory2 } from "react-icons/tb";
import AddNewCategoryModal from "@/components/features/products/categories/AddNewCategoryModal";
import CategoryCard from "@/components/features/products/categories/CategoryCard";
import { useGetCategories } from "@/hooks/api/categories/useCategory";

const Categories = () => {
  const { data: categories, isLoading } = useGetCategories();
  const isExistItems = !!categories?.data?.length;

  const [editCategory, setEditCategory] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditCategory = (category: any) => {
    setEditCategory(category);
    setIsEditOpen(true);
  };

  return (
    <>
      {/* Modal for Add / Edit */}
      <AddNewCategoryModal
        key={editCategory?.id ?? "new"}
        categoryId={editCategory?.id}
        defaultValues={editCategory}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Main Card */}
      <UnifiedCard
        headerProps={{
          title: "مدیریت دسته‌بندی‌ها",
          icon: <TbCategory2 className="text-2xl" />,
          children: <AddNewCategoryModal />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={false}
        meta={undefined}
        childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      >
        {categories?.data?.map((category: any) => (
          <CategoryCard
            key={category.id}
            categories={category}
            onEdit={handleEditCategory}
          />
        ))}
      </UnifiedCard>
    </>
  );
};

export default Categories;
