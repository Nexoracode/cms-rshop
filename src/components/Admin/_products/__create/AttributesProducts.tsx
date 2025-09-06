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

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  // فیلتر attributeهایی که is_variant: true دارند
  const variantAttributes = attributes.filter((attr) => attr.is_variant);

  // آرایه‌ای از تمام مقادیر برای ساخت ترکیب‌ها
  const variantValues = variantAttributes.map((attr) => attr.values);

  // تمام ترکیب‌ها
  const allCombinations = cartesianObject(variantValues);

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
                onHandleSubmit={() => {
                  // اینجا می‌تونی api call بزنی
                  console.log("submit variant", combo);
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

          <Button color="success" className="text-white">
            ثبت ویژگی های محصولات
          </Button>
        </CardBody>
      </Card>

      <AddNewAttributesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(data: Record<string, any>) =>
          setAttributes((prev) => {
            const index = prev.findIndex((a) => a.id === data.id);
            if (index !== -1) {
              const updated = [...prev];
              updated[index] = data;
              return updated;
            }
            return [...prev, data];
          })
        }
      />
    </>
  );
};

export default AttributesProducts;
