"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";

// تابع ساده برای گرفتن تمام ترکیب‌های ممکن از attributeهای variant
function cartesianObject(arrays: any[][]): any[][] {
  if (!arrays.length) return [];
  let result: any[][] = [[]];
  for (const group of arrays) {
    const temp: any[][] = [];
    for (const combination of result) {
      for (const item of group) {
        temp.push([...combination, item]);
      }
    }
    result = temp;
  }
  return result;
}

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attributes, setAttributes] = useState<any[]>([]);
  const [variantsData, setVariantsData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  // فیلتر attributeهایی که is_variant: true دارند
  const variantAttributes = attributes.filter((attr) => attr.is_variant);

  // آرایه‌ای از تمام مقادیر برای ساخت ترکیب‌ها
  const variantValues = variantAttributes.map((attr) => attr.values);

  // تمام ترکیب‌ها
  const allCombinations = cartesianObject(variantValues);

  const findItemForReplaceInArray = (
    datas: any[],
    obj: Record<string, any>
  ) => {
    const index = datas.findIndex((a) => a.id === obj.id);
    if (index !== -1) {
      const updated = [...datas];
      updated[index] = obj;
      return updated;
    }

    return [...datas, obj];
  };

  const handleChangesAttributes = () => {
    // اطلاعات variant بدون id
    const variantsInfo = variantsData.map(({ id, ...rest }) => rest);

    // فقط attributeهایی که is_variant هستند
    const variantAttributes = attributes.filter((attr) => attr.is_variant);

    // آماده‌سازی valueها
    const variantValues = variantAttributes.map((attr) =>
      attr.values.map((v: any) => ({
        attribute_id: v.attribute_id,
        value_id: v.id,
        label: v.value,
      }))
    );

    // تابع کراس‌پروداکت
    const cartesian = (arrays: any[][]) =>
      arrays.reduce(
        (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
        [[]]
      );

    const allCombinations = cartesian(variantValues);

    const product_id = 53;

    // ساخت variantهای نهایی
    const variants = allCombinations.map((combo, index) => ({
      product_id,
      ...variantsInfo[index], // اینجا هر ترکیب داده خودش رو میگیره
      attributes: combo.map((c: any) => ({
        attribute_id: c.attribute_id,
        value_id: c.value_id,
        label: c.label,
      })),
    }));

    console.log("allCombinations:", allCombinations);
    console.log("variants (برای ارسال به API):", variants);
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

          {/* رندر ترکیب‌های variant */}
          {allCombinations.map((combo, idx) => {
            // ساخت اسم ترکیبی برای VariantRowEditor
            const variantName = combo.map((c) => c.value).join(" / ");
            return (
              <VariantRowEditor
                key={idx}
                variantName={variantName}
                onHandleSubmit={(data) => {
                  setVariantsData((prev) =>
                    findItemForReplaceInArray(prev, data)
                  );
                }}
                onRemove={(id) => {
                  setVariantsData((prev) => {
                    return prev.filter((a) => a.id !== id);
                  });
                }}
              />
            );
          })}

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
          setAttributes((prev) => findItemForReplaceInArray(prev, data))
        }
      />
    </>
  );
};

export default AttributesProducts;
