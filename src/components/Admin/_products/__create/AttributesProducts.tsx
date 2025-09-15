"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";
import {
  mergeOrAddAttribute,
  replaceOrAddById,
} from "@/utils/replaceOrAddById";
import { cartesian } from "@/utils/cartesian";
import {
  useAddNewVariantProduct,
  useDeleteVariant,
  useUpdateVariantProduct,
} from "@/hooks/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useGetOneProduct } from "@/hooks/products/useProduct";
import { Variant } from "@/types/attributes";
import toast from "react-hot-toast";
import { useAttributeContext } from "../context/AttributeContext";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { page } = usePaginationParams("edit_id");
  const { attrInfos, setAttrInfos } = useAttributeContext();
  ///

  //? Api Calls
  const { data: productData } = useGetOneProduct(page);
  const { mutate: deleteVariant } = useDeleteVariant();
  const addNewVariantProductMutation = useAddNewVariantProduct();
  const updateVariantProductMutation = useUpdateVariantProduct();

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
{/* 
          {cartesianAttributes.length > 0 && (
            <div className="bg-slate-200 rounded-xl p-4 flex flex-col gap-6">
              {cartesianAttributes.map((combo, idx) => {
                const variantName = combo.map((c: any) => c.value).join(" ، ");
                return (
                  <VariantRowEditor
                    key={idx}
                    variantName={variantName}
                    onHandleSubmit={(data) =>
                      setVariantsData((prev) => replaceOrAddById(prev, data))
                    }
                    onRemove={(id) => deleteVariantInDom(id, idx, combo)}
                    defaultValues={null}
                  />
                );
              })}
            </div>
          )} */}

          {/* {isEditMode && productData?.data?.variants && !attributesChanged && (
            <>
              {productData.data.variants.map((variant: any, index: number) => {
                return (
                  <VariantRowEditor
                    key={index}
                    variantName={variant.name}
                    onHandleSubmit={(data) => {
                      if (typeof data.id !== "number") return;
                      setDefaultVariantsData((prev) =>
                        replaceOrAddById(prev, data)
                      );
                    }}
                    onRemove={(id) => deleteVariant(id)}
                    defaultValues={variant}
                  />
                );
              })}
            </>
          )} */}

          <Button color="success" className="text-white" onPress={() => {}}>
            ثبت تغیرات ویژگی ها
          </Button>
        </CardBody>
      </Card>

      <AddNewAttributesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(data: Record<string, any>) => {
          //setAttributes((prev) => mergeOrAddAttribute(prev, data));
        }}
      />
    </>
  );
};

export default AttributesProducts;
