"use client";

import AddNewCategoryModal from "@/components/Admin/_products/__categories/AddNewCategoryModal";
import CategoryTree from "@/components/Admin/_products/__categories/CategoryCard";
import CardContent from "@/components/Admin/CardContent";
import BackToPage from "@/components/Helper/BackToPage";
import DynamicModal from "@/components/Helper/DynamicModal";
import {
  useDeleteCategory,
  useGetCategories,
} from "@/hooks/categories/useCategory";
import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import { TbCategory2 } from "react-icons/tb";

const Categories = () => {
  const [editCategory, setEditCategory] = useState<any>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const { mutate: deleteCategory } = useDeleteCategory();

  const { data: categories, isLoading } = useGetCategories();

  //? Disclosure
  const {
    isOpen: isOpenCategoryModal,
    onOpen: onOpenCategoryModal,
    onOpenChange: onOpenChangeCategoryModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  return (
    <>
      <div className="mb-4">
        <BackToPage title="برگشت به لیست محصولات" link="/admin/products" />
      </div>

      <section className="flex flex-col gap-6">
        <CardContent
          datas={categories}
          isExistItems={categories?.data?.length}
          isLoading={isLoading}
          title="لیست دسته‌بندی‌ها"
          keyTitle="دسته‌بندی"
          onAdd={onOpenCategoryModal}
          icon={<TbCategory2 className="text-3xl animate-pulse" />}
        >
          {/* ✅ فقط یک بار CategoryTree */}
          <CategoryTree
            categories={categories?.data || []}
            onDelete={(id) => {
              setDeleteCategoryId(id);
              onOpenDeleteModal();
            }}
            onEdit={(cat) => {
              setEditCategory(cat);
              onOpenCategoryModal();
            }}
          />
        </CardContent>
      </section>

      {/* Delete Modal */}
      <DynamicModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
        icon={<TbCategory2 className="text-3xl" />}
        title={"تایید حذف دسته‌بندی"}
        onConfirm={() => deleteCategory(deleteCategoryId || -1)}
      >
        آیا مطمئن هستید می‌خواهید این دسته‌بندی را حذف کنید؟ پس از حذف، امکان
        بازیابی آن وجود نخواهد داشت.
      </DynamicModal>

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
