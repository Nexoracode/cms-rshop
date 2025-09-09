"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";
import { replaceOrAddById } from "@/utils/replaceOrAddById";
import { cartesian } from "@/utils/cartesian";
import {
  useAddNewVariantProduct,
  useUpdateVariantProduct,
} from "@/hooks/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useGetOneProduct } from "@/hooks/products/useProduct";
import { Variant } from "@/types/attributes";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  ///
  const [attributes, setAttributes] = useState<any[]>([]);
  const [cartesianAttributes, setCartesianAttributes] = useState<any[]>([]);
  const [cartesianDefaultAttributes, setCartesianDefaultAttributes] = useState<
    any[]
  >([]);
  const [variantsData, setVariantsData] = useState<Variant[]>([]);
  //
  const { page } = usePaginationParams("edit_id");
  const { data: productData } = useGetOneProduct(page);
  const addNewVariantProductMutation = useAddNewVariantProduct();
  const updateVariantProductMutation = useUpdateVariantProduct();

  useEffect(() => {
    combinationsDefaultValues();
    combinationsAttrValues();
  }, []);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  const combinationsAttrValues = () => {
    const variantAttributes = attributes.filter((attr) => attr.is_variant);
    const variantValues = variantAttributes.map((attr) => attr.values);
    if (!variantValues.length) return;
    setCartesianAttributes(cartesian(variantValues));
  };

  const combinationsDefaultValues = () => {
    const defaultVariants: Record<string, any>[] = productData?.data.variants;
    if (!defaultVariants.length) return;
    // get all Attribute
    const allAttributes = defaultVariants[0].attributes.map(
      (variant: any) => variant.attribute
    );
    // get unique Attributes
    const uniqueAttributes = allAttributes.filter(
      (attr: any, index: any, self: any[]) =>
        index === self.findIndex((a: any) => a.id === attr.id)
    );
    // get AttributeValues
    const attrValues = uniqueAttributes.map((attr: any) => attr.values);
    setCartesianDefaultAttributes(cartesian(attrValues));
  };

  const handleChangesAttributes = async () => {
    const varientDatasOld = [...variantsData].filter((val) => val?.id);
    const varientDatasNew = [...variantsData].filter((val) => !val?.id);

    console.log("variantsData =>>>>>>>>>>>>>", variantsData);
    console.log(
      "varientDatasOld & varientDatasNew =>>>>>>>>>>>>>",
      varientDatasOld,
      varientDatasNew
    );

    const variantValues = variantAttributes.map((attr) =>
      attr.values.map((v: any) => ({
        attribute_id: v.attribute_id,
        value_id: v.id,
        label: v.value,
      }))
    );
    console.log("variantAttributes =>>>>>>>>>", variantAttributes);
    console.log("variantValues =>>>>>>>>>", variantValues);

    const allCombinations = cartesian(variantValues);
    const product_id = page;
    console.log("allCombinations =>>>>>>>>>", allCombinations);

    const variants = allCombinations.map((combo, index) => ({
      product_id,
      ...varientDatasNew[index],
      attributes: combo.map((c: any) => ({
        attribute_id: c.attribute_id,
        value_id: c.value_id,
        label: c.label,
      })),
    }));
    console.log("variants =>>>>>>>>>", variants);

    /*  try {
      // همه variantها رو همزمان ارسال کن
      await Promise.all(
        variants.map((variant) =>
          addNewVariantProductMutation.mutateAsync(variant)
        )
      );
      router.push("/admin/products");
    } catch (error) {
      console.error("خطا در افزودن variants:", error);
    } */
  };

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

          <div className="bg-slate-200 rounded-xl p-4 flex flex-col gap-6">
            {cartesianAttributes.length
              ? cartesianAttributes.map((combo, idx) => {
                  const variantName = combo
                    .map((c: any) => c.value)
                    .join(" / ");
                  return (
                    <VariantRowEditor
                      key={idx}
                      variantName={variantName}
                      onHandleSubmit={(data) => {
                        console.log(data);
                        setVariantsData((prev) => replaceOrAddById(prev, data));
                      }}
                      onRemove={(id) => {
                        setVariantsData((prev) => {
                          return prev.filter((a) => a.id !== id);
                        });
                      }}
                      defaultValues={null}
                    />
                  );
                })
              : ""}
          </div>

          {cartesianDefaultAttributes.length
            ? cartesianDefaultAttributes.map((combo, idx) => {
                const variantName = combo.map((c: any) => c.value).join(" / ");
                return (
                  <VariantRowEditor
                    key={idx}
                    variantName={variantName}
                    onHandleSubmit={(data) => {
                      console.log(data);
                      //setVariantsData((prev) => replaceOrAddById(prev, data));
                    }}
                    onRemove={(id) => {
                      /* setVariantsData((prev) => {
                        return prev.filter((a) => a.id !== id);
                      }); */
                    }}
                    defaultValues={null}
                  />
                );
              })
            : ""}

          {/* attributeهای معمولی (is_variant: false) */}
          {attributes
            .filter((attr) => !attr.is_variant)
            .map((attr) => (
              <Card key={attr.id} className="shadow-md">
                <CardBody className="flex items-center justify-between">
                  <p className="text-gray-700">{attr.name}</p>
                </CardBody>
              </Card>
            ))}

          {attributes.length ? (
            <Button
              color="success"
              className="text-white"
              onPress={handleChangesAttributes}
            >
              ثبت ویژگی های محصولات
            </Button>
          ) : (
            ""
          )}
        </CardBody>
      </Card>

      <AddNewAttributesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(data: Record<string, any>) =>
          setAttributes((prev) => replaceOrAddById(prev, data))
        }
      />
    </>
  );
};

export default AttributesProducts;
