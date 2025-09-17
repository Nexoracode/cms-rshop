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
import { useReorderAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { page } = usePaginationParams("edit_id");
  const { attrInfos, setAttrInfos } = useAttributeContext();
  ///
  //? Api Calls
  const { data: productData } = useGetOneProduct(page);
  const { mutate: deleteVariant } = useDeleteVariant();
  const updateVariantProductMutation = useUpdateVariantProduct();
  const [nodes, setNodes] = useState(productData?.data.attribute_nodes ?? []);

  useEffect(() => {
    if (productData?.data?.attribute_nodes) {
      const attrValues = productData?.data.attribute_nodes.flatMap(
        (group: any) => group.attributes.flatMap((attr: any) => attr.values)
      );
      setAttrInfos(attrValues);
    }
  }, [productData?.data]);

  const updateVariantProduct = () => {};

  return (
    <>
      <Card className="w-full shadow-md">
        <BoxHeader
          title="ویژگی های محصول"
          color="bg-purple-700/10 text-purple-700"
          icon={<TbCategory2 className="text-3xl" />}
        />
        <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
          <HeaderAction
            title="ویژگی ها"
            textBtn={"+ افزودن ویژگی"}
            onPress={onOpen}
          />
          <SortableAttributeNodes
            attributeNodes={productData?.data?.attribute_nodes}
            reorderGroup={useReorderAttributeGroup()}
            reorderAttribute={useReorderAttribute()}
            reorderValue={useReorderAttributeValue()}
          />
          {productData?.data?.variants
            ? productData.data.variants.map((variant: any, index: number) => {
                return (
                  <VariantRowEditor
                    key={index}
                    variantName={variant?.name}
                    onHandleSubmit={(data) => {}}
                    onRemove={(id) => {
                      console.log(id);
                      deleteVariant(id);
                    }}
                    defaultValues={variant}
                  />
                );
              })
            : ""}
          <Button
            color="success"
            className="text-white"
            onPress={updateVariantProduct}
          >
            ثبت تغیرات ویژگی ها
          </Button>
        </CardBody>
      </Card>

      <AddNewAttributesModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AttributesProducts;
