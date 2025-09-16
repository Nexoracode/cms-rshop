"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";
import { cartesian } from "@/utils/cartesian";
import {
  useDeleteVariant,
  useUpdateVariantProduct,
} from "@/hooks/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useGetOneProduct } from "@/hooks/products/useProduct";
import { useAttributeContext } from "../context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { AttributeTree } from "./attribute-tree ";
import { useEffect } from "react";

export const attributeNodes: AttributeTree = [
  {
    id: 12,
    name: "ویژگی های سراسری",
    slug: "public-attributes",
    display_order: null,
    attributes: [
      {
        id: 43,
        name: "سایز",
        slug: "size",
        is_public: true,
        group_id: 12,
        type: "text",
        display_order: null,
        is_variant: true,
        values: [
          {
            id: 44,
            value: "بزرگ",
            attribute_id: 43,
            display_color: "",
            display_order: null,
            is_active: true,
          },
          {
            id: 45,
            value: "کوچک",
            attribute_id: 43,
            display_color: "",
            display_order: null,
            is_active: true,
          },
        ],
      },
      {
        id: 42,
        name: "رنگ",
        slug: "color",
        is_public: true,
        group_id: 12,
        type: "color",
        display_order: null,
        is_variant: true,
        values: [
          {
            id: 42,
            value: "زرد",
            attribute_id: 42,
            display_color: "#ffea00",
            display_order: null,
            is_active: true,
          },
          {
            id: 43,
            value: "سبز",
            attribute_id: 42,
            display_color: "#00ff1e",
            display_order: null,
            is_active: true,
          },
          {
            id: 46,
            value: "مشکی",
            attribute_id: 42,
            display_color: "#000000",
            display_order: null,
            is_active: true,
          },
        ],
      },
    ],
  },
  {
    id: 21,
    name: "ویژگی های اختصاصی",
    slug: "custom-attributes",
    display_order: null,
    attributes: [
      {
        id: 55,
        name: "وزن",
        slug: "weight",
        is_public: true,
        group_id: 21,
        type: "text",
        display_order: null,
        is_variant: true,
        values: [
          {
            id: 56,
            value: "سبک",
            attribute_id: 55,
            display_color: "",
            display_order: null,
            is_active: true,
          },
          {
            id: 57,
            value: "سنگین",
            attribute_id: 55,
            display_color: "",
            display_order: null,
            is_active: true,
          },
        ],
      },
      {
        id: 58,
        name: "جنس",
        slug: "material",
        is_public: true,
        group_id: 21,
        type: "text",
        display_order: null,
        is_variant: true,
        values: [
          {
            id: 59,
            value: "پارچه",
            attribute_id: 58,
            display_color: "",
            display_order: null,
            is_active: true,
          },
          {
            id: 60,
            value: "چرم",
            attribute_id: 58,
            display_color: "",
            display_order: null,
            is_active: true,
          },
          {
            id: 61,
            value: "پلاستیک",
            attribute_id: 58,
            display_color: "",
            display_order: null,
            is_active: true,
          },
        ],
      },
    ],
  },
];

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
  console.log(productData);

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
          <SortableAttributeNodes attributeNodes={attributeNodes} />
          {productData?.data?.variants
            ? productData.data.variants.map((variant: any, index: number) => {
                return (
                  <VariantRowEditor
                    key={index}
                    variantName={variant?.name}
                    onHandleSubmit={(data) => {}}
                    onRemove={(id) => deleteVariant(id)}
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
