"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
//
import ImagesProducts from "@/components/Admin/_products/__create/ImagesProducts";
import InitInfos from "@/components/Admin/_products/__create/InitInfos";
import MiddAdditionalInfos from "@/components/Admin/_products/__create/MiddAdditionalInfos";
import LastAdditionalInfos from "@/components/Admin/_products/__create/LastAdditionalInfos";
import BackToPage from "@/components/Helper/BackToPage";
import { Product } from "@/components/Admin/_products/__create/product-type";

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
  const [initInfos, setInitInfos] = useState<InitInfosType | null>(null);
  const [middInfos, setMiddInfos] = useState<MiddInfosType | null>(null);
  const [lastInfos, setLastInfos] = useState<LastInfosType | null>(null);
  const [media_ids, setMedia_ids] = useState<number[]>([]);
  const [media_pinned_id, setMedia_pinned_id] = useState<number | null>(null);

  useEffect(() => {
    if (!initInfos || !middInfos || !lastInfos) return;

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

    const productLastInfos = lastInfos;

    const result = {
      ...productInitInfos,
      ...productMiddInfos,
      ...productLastInfos,
      media_ids,
      media_pinned_id,
    };

    console.log("✅ Final Product Object:", result);
  }, [initInfos, middInfos, lastInfos, media_ids, media_pinned_id]);

  return (
    <div>
      <BackToPage title="برگشت" link="/admin/products" />
      <section className="flex flex-col gap-6 py-6">
        <ImagesProducts
          onMedia_ids={(datas) => setMedia_ids(datas)}
          onMedia_pinned_id={(id) => setMedia_pinned_id(id)}
        />

        <InitInfos onChange={setInitInfos} />

        <MiddAdditionalInfos onChange={setMiddInfos} />

        <LastAdditionalInfos onChange={setLastInfos} />

        <Button
          color="secondary"
          isDisabled={!initInfos || !middInfos || !lastInfos}
        >
          ثبت محصول
        </Button>
      </section>
    </div>
  );
};

export default CreateNewProduct;
