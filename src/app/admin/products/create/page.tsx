"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
//
import ImagesProducts from "@/components/Admin/_products/__create/ImagesProducts";
import InitInfos from "@/components/Admin/_products/__create/InitInfos";
import MiddAdditionalInfos from "@/components/Admin/_products/__create/MiddAdditionalInfos";
import LastAdditionalInfos from "@/components/Admin/_products/__create/LastAdditionalInfos";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";
import ImageCropper from "@/components/Helper/ImageCropper";
import BackToPage from "@/components/Helper/BackToPage";
import { Product } from "@/components/Admin/_products/__create/product-type";

type ProductInfo = {
  medias?: any[];
  initInfos?: Pick<
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
  middInfos?: Pick<
    Product,
    | "weight"
    | "weight_unit"
    | "is_same_day_shipping"
    | "requires_preparation"
    | "preparation_days"
  >;
};

const CreateNewProduct = () => {
  const [productInfos, setProductInfos] = useState<ProductInfo | null>(null);

  useEffect(() => {
    if (productInfos?.initInfos && productInfos?.middInfos) {
      const {
        name,
        price,
        stock,
        is_limited_stock,
        discount_amount,
        discount_percent,
        is_featured,
        category_id,
      } = productInfos.initInfos;

      const productInitInfos = {
        name,
        price,
        stock,
        is_limited_stock,
        is_featured,
        category_id,
        ...(discount_percent ? { discount_percent } : { discount_amount }),
      };
      console.log("Product Init Infos:", productInitInfos);

      /*  */
      const productMiddInfos = {};
    }
  }, [productInfos]);

  return (
    <div>
      <BackToPage title="برگشت" link="/admin/products" />
      <section className="flex flex-col gap-6 py-6">
        <InitInfos
          onChange={(datas) =>
            setProductInfos((prev) =>
              prev ? { ...prev, initInfos: datas } : { initInfos: datas }
            )
          }
        />
        <MiddAdditionalInfos
          onChange={(datas) =>
            setProductInfos((prev) =>
              prev ? { ...prev, middInfos: datas } : { middInfos: datas }
            )
          }
        />
        <LastAdditionalInfos />
        <ImagesProducts>
          <ImageCropper
            onPreviewsChange={(datas) =>
              setProductInfos((prev) =>
                prev ? { ...prev, medias: datas } : { medias: datas }
              )
            }
          />
        </ImagesProducts>
        <AttributesProducts />
        <Button
          color="secondary"
          isDisabled={
            !productInfos || !productInfos.initInfos || !productInfos.middInfos
          }
        >
          ثبت محصول
        </Button>
      </section>
    </div>
  );
};

export default CreateNewProduct;
