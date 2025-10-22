"use client";

import AddNewCategoryModal from "@/components/admin/products/categories/AddNewCategoryModal";
import CategoryTree from "@/components/admin/products/categories/CategoryCard";
import EntityCard from "@/components/shared/EntityCard";
import BackToPage from "@/components/widgets/BackToPage";
import { useGetCategories } from "@/hooks/api/categories/useCategory";
import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import { TbCategory2 } from "react-icons/tb";

const Categories = () => {
  const [editCategory, setEditCategory] = useState<any>(null);

  const { data: categories, isLoading } = useGetCategories();

  //? Disclosure
  const {
    isOpen: isOpenCategoryModal,
    onOpen: onOpenCategoryModal,
    onOpenChange: onOpenChangeCategoryModal,
  } = useDisclosure();

  return (
    <>
      <div className="mb-4">
        <BackToPage title="برگشت به لیست محصولات" link="/admin/products" />
      </div>

      <section className="flex flex-col gap-6">
        <EntityCard
          datas={categories}
          isExistItems={categories?.data?.length}
          isLoading={isLoading}
          title="دسته بندی ها"
          onAdd={onOpenCategoryModal}
          icon={<TbCategory2 className="text-2xl" />}
        >
          {/* ✅ فقط یک بار CategoryTree */}
          <CategoryTree
            categories={categories?.data || []}
            onEdit={(cat) => {
              setEditCategory(cat);
              onOpenCategoryModal();
            }}
          />
        </EntityCard>
      </section>

      {/* Update Category Modal */}
      <AddNewCategoryModal
        key={editCategory?.id ?? "new"}
        isOpen={isOpenCategoryModal}
        onOpenChange={() => {
          setTimeout(() => setEditCategory(null), 200);
          onOpenChangeCategoryModal();
        }}
        defaultValues={editCategory}
        categoryId={editCategory?.id}
      />
    </>
  );
};

export default Categories;
