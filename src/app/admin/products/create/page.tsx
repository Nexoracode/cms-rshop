"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
//
import ImagesProducts from "@/components/Admin/_products/__create/ImagesProducts";
import InitInfos from "@/components/Admin/_products/__create/InitInfos";
import MiddAdditionalInfos from "@/components/Admin/_products/__create/MiddAdditionalInfos";
import LastAdditionalInfos from "@/components/Admin/_products/__create/LastAdditionalInfos";
import BackToPage from "@/components/Helper/BackToPage";
import { Product } from "@/components/Admin/_products/types/create-product";
import {
  useGetOneProduct,
  useProductCreate,
  useProductUpdate,
} from "@/hooks/products/useProduct";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";
import { useSearchParams } from "next/navigation";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import {
  InitInfosType,
  MiddInfosType,
} from "@/components/Admin/_products/types/products";
import ProductInitialForm from "@/components/Admin/_products/__create/ProductInitialForm";

type LastInfosType = {
  description: string;
  is_visible: boolean;
  order_limit: number;
  helper_id: number | null;
  brand_id: number | null;
};

const CreateNewProduct = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit_id");
  const [activeForm, setActiveForm] = useState<"infos" | "attributes">("infos");
  //? Hooks
  const { mutate: createProduct } = useProductCreate();
  const { data, isLoading } = useGetOneProduct(editId ? +editId : undefined);
  const { mutate: updateProduct } = useProductUpdate(
    editId ? +editId : undefined
  );

  const handleChangeProduct = () => {
    /*   console.log("⬆️ Sending to API...", result);

    if (!editId) {
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            setActiveForm("attributes");
          }
        },
      });
    } else {
      updateProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            setActiveForm("attributes");
          }
        },
      });
    } */
  };

  return (
    <div>
      <BackToPage title="برگشت" link="/admin/products" />
      <section className="flex flex-col gap-6 py-6">
        {activeForm === "infos" ? (
          editId && isLoading ? (
            <div className="bg-white rounded-2xl shadow-md py-16">
              <LoadingApiCall />
            </div>
          ) : (
            <>
              <ProductInitialForm />

              <Button color="secondary" onPress={handleChangeProduct}>
                ثبت تغیرات
              </Button>
            </>
          )
        ) : (
          <>
            <AttributesProducts />
            <Button color="success" className="text-white">
              ثبت نهایی محصول
            </Button>
          </>
        )}
      </section>
    </div>
  );
};

export default CreateNewProduct;
