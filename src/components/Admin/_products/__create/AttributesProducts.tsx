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
  const { attrInfos, setAttrInfos } = useAttributeContext();
  ///
  const [attributes, setAttributes] = useState<any[]>([]);
  const [cartesianAttributes, setCartesianAttributes] = useState<any[]>([]);
  const [cartesianDefaultAttributes, setCartesianDefaultAttributes] = useState<
    any[]
  >([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [variantsData, setVariantsData] = useState<Variant[]>([]);
  const [defaultVariantsData, setDefaultVariantsData] = useState<Variant[]>([]);
  //
  const { page } = usePaginationParams("edit_id");
  const { data: productData } = useGetOneProduct(page);
  const addNewVariantProductMutation = useAddNewVariantProduct();
  const updateVariantProductMutation = useUpdateVariantProduct();
  const { mutate: deleteVariant } = useDeleteVariant();

  useEffect(() => {
    combinationsDefaultValues();
    combinationsAttrValues();
  }, []);

  useEffect(() => {
    console.log("Attributes in AttributeProduct PAGE", attributes);
    if (!attributes.length) return;
    setAttrInfos(attributes);
    combinationsAttrValues();
  }, [attributes]);

  useEffect(() => {
    if (productData?.data?.variants) {
      const variants = productData.data.variants;
      setIsEditMode(true);
      // استخراج تمام ویژگی‌های منحصر به فرد از variants
      const uniqueAttributes: Record<number, any> = {};

      variants.forEach((variant: any) => {
        variant.attributes.forEach((attr: any) => {
          const attribute = attr.attribute;

          if (!uniqueAttributes[attribute.id]) {
            uniqueAttributes[attribute.id] = {
              ...attribute,
              values: [],
              is_variant: attribute.is_variant,
            };
          }

          // یافتن مقدار value واقعی از داده‌های attribute اصلی
          if (
            attr.value_id &&
            attribute.values &&
            attribute.values.length > 0
          ) {
            const realValue = attribute.values.find(
              (v: any) => v.id === attr.value_id
            );
            if (
              realValue &&
              !uniqueAttributes[attribute.id].values.some(
                (v: any) => v.id === realValue.id
              )
            ) {
              uniqueAttributes[attribute.id].values.push({
                ...realValue,
                attribute_id: attribute.id,
              });
            }
          } else if (attr.label) {
            // اگر valueهای اصلی در دسترس نیستند، از label استفاده کنیم
            const valueExists = uniqueAttributes[attribute.id].values.some(
              (v: any) => v.value === attr.label || v.id === attr.value_id
            );

            if (!valueExists) {
              uniqueAttributes[attribute.id].values.push({
                id: attr.value_id || Date.now(), // استفاده از timestamp اگر id وجود ندارد
                value: attr.label,
                attribute_id: attribute.id,
                display_color: attribute.type === "color" ? attr.label : null,
              });
            }
          }
        });
      });

      const attributesArray = Object.values(uniqueAttributes);
      setAttributes(attributesArray);
      setAttrInfos(attributesArray);
    } else setIsEditMode(false);
  }, [productData]);

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

  const apiCallAddNewVariants = async () => {
    const variantAttributes = attributes.filter((attr) => attr.is_variant);
    const variantsFilter = variantsData.map(({ id, ...rest }) => rest);

    const variantValues = variantAttributes.map((attr) =>
      attr.values.map((v: any) => ({
        attribute_id: v.attribute_id,
        value_id: v.id,
        label: v.value,
      }))
    );

    const allCombinations = cartesian(variantValues);
    const product_id = page;

    const variants = allCombinations.map((combo, index) => ({
      product_id,
      ...variantsFilter[index],
      attributes: combo.map((c: any) => ({
        attribute_id: c.attribute_id,
        value_id: c.value_id,
        label: c.label,
      })),
    }));

    try {
      const checkValidate = variants.every(
        (variant) => variant.sku.length && variant.price
      );
      if (checkValidate) {
        await Promise.all(
          variants.map((variant) =>
            addNewVariantProductMutation.mutateAsync(variant)
          )
        );
        router.push("/admin/products");
      } else {
        toast.error("لطفا مقادیر خواسته شده را وارد کنید");
      }
    } catch (error) {
      console.error("خطا در افزودن variants:", error);
    }
  };

  const apiCallUpdateVariants = async () => {
    const product_id = page;

    try {
      if (!productData?.data.variants || !defaultVariantsData) return;

      // ترکیب attributes با هر واریانت
      const combined = defaultVariantsData.map((variant, idx) => {
        const source = productData?.data.variants?.[idx];
        const currentAttributes = source?.attributes ?? [];
        // dedupe اگر لازم است:
        const filtered = currentAttributes.filter(
          (a: any, i: number, self: any[]) =>
            i === self.findIndex((v) => v.attribute_id === a.attribute_id)
        );
        return {
          ...variant,
          product_id,
          attributes: filtered.map((v: any) => ({
            attribute_id: v.attribute_id,
            value_id: v.value_id, // دقت کن همین فیلد را بفرستی
            label: v.label ?? "any",
          })),
        };
      });

      // ارسال API برای هر واریانت
      await Promise.all(
        combined.map((variant) =>
          updateVariantProductMutation.mutateAsync({
            id: +variant.id,
            data: variant,
          })
        )
      );

      router.push("/admin/products");
    } catch (error) {
      console.error("خطا در آپدیت variants:", error);
      toast.error("آپدیت واریانت‌ها با خطا مواجه شد");
    }
  };

  const deleteVariantInDom = (
    variantId: string | number,
    indexRow: number,
    combo: Record<string, any>
  ) => {
    setVariantsData((prev) => prev.filter((a) => a.id !== variantId));

    setCartesianAttributes((prev) => {
      const filterItems = prev.filter((a, index) => index !== indexRow);

      if (!filterItems.length) {
        setAttributes([]);
        return filterItems;
      }

      combo.forEach((deletedValue: any) => {
        const stillExists = filterItems.some((row) =>
          row.some((val: any) => val.id === deletedValue.id)
        );

        if (!stillExists) {
          setAttributes((prevAttrs) =>
            prevAttrs.map((attr) =>
              attr.id === deletedValue.attribute_id
                ? {
                    ...attr,
                    values: attr.values.filter(
                      (val: any) => val.id !== deletedValue.id
                    ),
                  }
                : attr
            )
          );
        }
      });

      return filterItems;
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
        <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
          <HeaderAction
            title="ویژگی ها"
            textBtn={"+ افزودن ویژگی"}
            onPress={onOpen}
          />

          <div className="bg-slate-200 rounded-xl p-4 flex flex-col gap-6">
            {(!isEditMode && cartesianAttributes.length)
              ? cartesianAttributes.map((combo, idx) => {
                  const variantName = combo
                    .map((c: any) => c.value)
                    .join(" ، ");
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
                })
              : ""}
          </div>

          {isEditMode && productData?.data?.variants
            ? productData?.data.variants.map((variant: any, index: number) => {
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

          {cartesianAttributes.length || cartesianDefaultAttributes.length ? (
            <Button
              color="success"
              className="text-white"
              onPress={() => {
                cartesianAttributes.length && apiCallAddNewVariants();
                cartesianDefaultAttributes.length && apiCallUpdateVariants();
              }}
            >
              ثبت تغیرات ویژگی ها
            </Button>
          ) : (
            ""
          )}
        </CardBody>
      </Card>

      <AddNewAttributesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(data: Record<string, any>) => {
          setAttributes((prev) => mergeOrAddAttribute(prev, data));
        }}
      />
    </>
  );
};

export default AttributesProducts;
