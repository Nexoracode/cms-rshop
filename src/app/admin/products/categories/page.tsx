"use client";

// Components
import AddNewCategoryModal from "@/components/Admin/_products/__categories/AddNewCategoryModal";
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
import BackToPage from "@/components/Helper/BackToPage";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import { useGetAllCategories } from "@/hooks/categories/useCategory";
//? Hooks
import { useDisclosure } from "@heroui/react";

const Categories = () => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { data: categories, isLoading } = useGetAllCategories();

  //? Functions
  console.log(categories);

  return (
    <>
      <section>
        <BackToPage title="بازگشت" link="/admin/products" />

        <div className="bg-white p-4 rounded-2xl mt-6">
          <HeaderAction
            title="دسته بندی ها"
            textBtn="+ جدید"
            onPress={onOpen}
          />

          <div className="flex flex-col gap-6 mt-6">
            {isLoading ? (
              <LoadingApiCall />
            ) : (
              "j"
            )}
          </div>
        </div>
      </section>
      <AddNewCategoryModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Categories;
