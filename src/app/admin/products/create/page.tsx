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
} from "@/hooks/products/useProduct";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";
import { useSearchParams } from "next/navigation";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import {
  InitInfosType,
  MiddInfosType,
} from "@/components/Admin/_products/types/products";

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
  const [initInfos, setInitInfos] = useState<InitInfosType | null>(null);
  const [middInfos, setMiddInfos] = useState<MiddInfosType | null>(null);
  const [lastInfos, setLastInfos] = useState<LastInfosType | null>(null);
  const [media_ids, setMedia_ids] = useState<number[]>([]);
  const [media_pinned_id, setMedia_pinned_id] = useState<number | null>(null);
  const [activeForm, setActiveForm] = useState<"infos" | "attributes">("infos");
  //? Hooks
  const { mutate: createProduct } = useProductCreate();
  const { data, isLoading } = useGetOneProduct(editId ? +editId : undefined);
  const initialMediasFromApi = data?.data?.medias ?? [];
  const initialPinnedIdFromApi = data?.data?.media_pinned?.id ?? null;

  const isAllFieldsFilled = <T extends object>(
    obj: T | null,
    ignoreKeys: (keyof T)[] = []
  ): boolean => {
    if (!obj) return false;

    return Object.entries(obj).every(([key, val]) => {
      if (ignoreKeys.includes(key as keyof T)) return true;

      return (
        val !== null &&
        val !== undefined &&
        !(typeof val === "string" && val.trim() === "")
      );
    });
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
    console.log(result);
    /*  if (Object.keys(result).length > 0) {
      console.log("⬆️ Sending to API...", result);
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            setActiveForm("attributes");
          }
        },
      });
    } */
  };

  // Default Values
  const initInfosDefaultValues = {
    name: data?.data?.name ?? "",
    price: data?.data?.price ?? 0,
    stock: data?.data?.stock ?? 0,
    is_limited_stock: data?.data?.is_limited_stock ?? false,
    is_featured: data?.data?.is_featured ?? false,
    discount_amount: data?.data?.discount_amount ?? null,
    discount_percent: data?.data?.discount_percent ?? null,
    category_id: data?.data?.category_id ?? 0,
  };

  const midsInfosDefaultValues = {
    weight: data?.data?.weight ?? 1,
    weight_unit: data?.data?.weight_unit ?? "کیلوگرم",
    is_same_day_shipping: data?.data?.is_same_day_shipping ?? false,
    requires_preparation: data?.data?.requires_preparation ?? false,
    preparation_days: data?.data?.preparation_days ?? 1,
  };

  const lastInfosDefaultValues = {
    description: data?.data?.description ?? "",
    is_visible: data?.data?.is_visible ?? true,
    order_limit: data?.data?.order_limit ?? 0,
    helper: data?.data?.helper,
    brand: data?.data?.brand,
  };

  console.log(data);

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
                initialMedias={initialMediasFromApi}
                initialPinnedId={initialPinnedIdFromApi}
              />

              <InitInfos
                onChange={setInitInfos}
                defaultValues={initInfosDefaultValues}
              />

              <MiddAdditionalInfos
                onChange={setMiddInfos}
                defaultValues={midsInfosDefaultValues}
              />

              <LastAdditionalInfos
                onChange={setLastInfos}
                defaultValues={lastInfosDefaultValues}
              />

              <Button
                color="secondary"
                isDisabled={
                  !isAllFieldsFilled(initInfos) ||
                  !isAllFieldsFilled(middInfos) ||
                  !isAllFieldsFilled(lastInfos)
                }
                onPress={handleNewProduct}
              >
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
