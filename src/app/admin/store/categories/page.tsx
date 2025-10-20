"use client";

import HeaderAction from "@/components/admin/_products/__create/helpers/HeaderAction";
import AddNewCategoryModal from "@/components/admin/_products/__categories/AddNewCategoryModal";
import BackToPage from "@/components/widgets/BackToPage";
import { useDisclosure } from "@heroui/react";

const Categories = () => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex flex-col gap-6">
        <BackToPage title="بازگشت" link="/admin/store" />

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
