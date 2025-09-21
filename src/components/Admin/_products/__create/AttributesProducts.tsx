"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";
import {
  useDeleteVariant,
  useUpdateVariantProduct,
} from "@/hooks/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useGetOneProduct } from "@/hooks/products/useProduct";
import { useAttributeContext } from "../context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { useEffect, useState } from "react";
import { replaceOrAddById } from "@/utils/replaceOrAddById";
import toast from "react-hot-toast";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { page } = usePaginationParams("edit_id");
  const { setAttrInfos } = useAttributeContext();
  const [variants, setVariants] = useState<any[]>([]);
  ///
  //? Api Calls
  const { data: productData } = useGetOneProduct(page);
  const { mutate: deleteVariant } = useDeleteVariant();
  const updateVariantProductMutation = useUpdateVariantProduct();
  console.log("LOG =>", productData);

  useEffect(() => {
    if (variants.length) {
      console.log("Variants => ", variants);
    }
  }, [variants]);

  useEffect(() => {
    if (productData?.data?.attribute_nodes) {
      const attrValues = productData?.data.attribute_nodes.flatMap(
        (group: any) => group.attributes.flatMap((attr: any) => attr.values)
      );
      setAttrInfos(attrValues);
    }
  }, [productData?.data]);

  const updateVariantProduct = async () => {
    Promise.all(
      variants.map((val) =>
        updateVariantProductMutation.mutateAsync({ id: val.id, data: val })
      )
    )
      .then(() => {
        toast.success("همه آپدیت شدن ✅");
        router.push("/admin/products");
      })
      .catch((err) => {
        toast.error("مشکلی در آپدیت یکی از واریانت‌ها پیش اومد");
        console.error(err);
      });
  };

  return (
    <>
      <Card className="w-full shadow-md">
        <BoxHeader
          title="ویژگی های محصول"
          color="bg-purple-700/10 text-purple-700"
          icon={<TbCategory2 className="text-3xl" />}
        />
        <CardBody dir="rtl" className="flex flex-col gap-6 text-start">
          <HeaderAction
            title="ویژگی ها"
            textBtn={"+ افزودن ویژگی"}
            onPress={onOpen}
          />
          {productData?.data?.attribute_nodes.length ? (
            <div className="flex flex-col gap-6 bg-gray-50 rounded-2xl p-4">
              <p className="text-[16px]">مرتب سازی ویژگی ها</p>
              <SortableAttributeNodes
                attributeNodes={productData?.data?.attribute_nodes}
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-6 bg-gray-50 rounded-2xl p-4">
            <p className="text-[16px]">ویژگی های متغیر</p>
            <div className="grid grid-cols gap-6 md:grid-cols-2">
              {productData?.data?.variants
                ? productData.data.variants.map(
                    (variant: any, index: number) => {
                      return (
                        <VariantRowEditor
                          key={index}
                          variantName={variant?.name}
                          onHandleSubmit={(data) => {
                            console.log("!!!!!!!!!!!", data);
                            setVariants((prev) => replaceOrAddById(prev, data));
                          }}
                          onRemove={(id) => {
                            console.log(id);
                            deleteVariant(id);
                          }}
                          defaultValues={variant}
                        />
                      );
                    }
                  )
                : ""}
            </div>
          </div>
          {(productData?.data?.variants.length || variants.length) ? (
            <Button
              color="success"
              className="text-white"
              onPress={updateVariantProduct}
            >
              ثبت تغیرات ویژگی ها
            </Button>
          ) : (
            ""
          )}
        </CardBody>
      </Card>

      <AddNewAttributesModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AttributesProducts;
