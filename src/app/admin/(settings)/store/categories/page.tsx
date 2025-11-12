"use client";

import HeaderAction from "@/components/common/Card/HeaderAction";
import AddNewCategoryModal from "@/components/features/products/categories/AddNewCategoryModal";
import { useDisclosure } from "@heroui/react";

const Categories = () => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="bg-white p-4 rounded-2xl">
          <HeaderAction
            title="دسته بندی"
            textBtn="+ جدید"
            onPress={onOpen}
          />

          <div className="flex flex-col gap-6 mt-6"></div>
        </div>
      </div>
      <AddNewCategoryModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Categories;
