"use client";

import { useEffect, useState } from "react";
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
} from "@/hooks/products/useProduct";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";
import { useSearchParams } from "next/navigation";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";

type InitInfosType = Pick<
  Product,
  | "category_id"
  | "name"
  | "price"
  | "stock"
  | "is_limited_stock"
  | "is_featured"
  | "discount_amount"
  | "discount_percent"
>;

type MiddInfosType = Pick<
  Product,
  | "weight"
  | "weight_unit"
  | "is_same_day_shipping"
  | "requires_preparation"
  | "preparation_days"
>;

type LastInfosType = Pick<Product, "description" | "is_visible">;

const CreateNewProduct = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit_id");
  const [initInfos, setInitInfos] = useState<InitInfosType | null>(null);
  const [middInfos, setMiddInfos] = useState<MiddInfosType | null>(null);
  const [lastInfos, setLastInfos] = useState<LastInfosType | null>(null);
  const [media_ids, setMedia_ids] = useState<number[]>([]);
  const [media_pinned_id, setMedia_pinned_id] = useState<number | null>(null);
  const [activeForm, setActiveForm] = useState<"infos" | "attributes">("infos");
  //? Hooks
  const { mutate: createProduct } = useProductCreate();
  const { data, isLoading } = useGetOneProduct(editId ? +editId : undefined);

  const isAllFieldsFilled = <T extends object>(obj: T | null): boolean => {
    if (!obj) return false;

    return Object.values(obj).every(
      (val) =>
        val !== null &&
        val !== undefined &&
        !(typeof val === "string" && val.trim() === "")
    );
  };

  const getFinalProductObject = () => {
    if (!initInfos || !middInfos || !lastInfos) return null;

    const {
      name,
      price,
      stock,
      is_limited_stock,
      discount_amount,
      discount_percent,
      is_featured,
      category_id,
    } = initInfos;

    const productInitInfos = {
      name,
      price,
      stock,
      is_limited_stock,
      is_featured,
      category_id,
      ...(discount_percent ? { discount_percent } : { discount_amount }),
    };

    const {
      is_same_day_shipping,
      preparation_days,
      requires_preparation,
      weight,
      weight_unit,
    } = middInfos;

    const productMiddInfos = {
      is_same_day_shipping,
      preparation_days,
      requires_preparation,
      weight,
      weight_unit,
    };

    return {
      ...productInitInfos,
      ...productMiddInfos,
      ...lastInfos,
      media_ids,
      media_pinned_id,
    };
  };

  const handleNewProduct = () => {
    const result = getFinalProductObject() as Product;
    if (!result) return;

    if (Object.keys(result).length > 0) {
      console.log("⬆️ Sending to API...", result);
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            setActiveForm("attributes");
          }
        },
      });
    }
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
              <ImagesProducts
                onMedia_ids={(datas) => setMedia_ids(datas)}
                onMedia_pinned_id={(id) => setMedia_pinned_id(id)}
              />

              <InitInfos onChange={setInitInfos} />

              <MiddAdditionalInfos onChange={setMiddInfos} />

              <LastAdditionalInfos onChange={setLastInfos} />

              <Button
                color="secondary"
                isDisabled={
                  !isAllFieldsFilled(initInfos) ||
                  !isAllFieldsFilled(middInfos) ||
                  !isAllFieldsFilled(lastInfos)
                }
                onPress={handleNewProduct}
              >
                ثبت محصول
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
