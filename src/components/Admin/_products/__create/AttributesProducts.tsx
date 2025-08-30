"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import AttributeBoxes from "./AttributesProduct/AttributeBoxes";
import {
  useUpdateAttribute,
  useUpdateAttributeValue,
} from "@/hooks/useAttribute";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attributes, setAttributes] = useState<any[]>([]);

  const updateAttributeMutation = useUpdateAttribute(0, undefined);
  const updateAttributeValueMutation = useUpdateAttributeValue(0, undefined);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  // --- حذف Attribute ---
  const handleDeleteAttribute = (attrId: number) => {
    setAttributes((prev) => prev.filter((a) => a.attr.id !== attrId));
  };

  // --- حذف AttributeValue ---
  const handleDeleteAttributeValue = (valId: number) => {
    setAttributes((prev) =>
      prev.map((a) => ({
        ...a,
        values: a.values.filter((v: any) => v.id !== valId),
      }))
    );
  };

  // --- مرتب سازی Attribute ---
  const handleOrderAttribute = (data: Record<string, any>) => {
    const { id, display_order } = data;

    setAttributes((prev) => {
      const attrIndex = prev.findIndex((a) => a.attr.id === id);
      if (attrIndex === -1) return prev;

      const moved = prev[attrIndex];
      const newArr = [...prev];
      newArr.splice(attrIndex, 1); // حذف
      newArr.splice(display_order, 0, moved); // اضافه کردن در ایندکس جدید

      // ارسال به parent (API)
      updateAttributeMutation.mutate(
        { id, ...moved.attr },
        {
          onSuccess: (res: any) => {
            setAttributes((cur) =>
              cur.map((a) => (a.attr.id === res.attr.id ? res : a))
            );
          },
        }
      );

      return newArr;
    });
  };

  // --- مرتب سازی AttributeValue ---
  const handleOrderAttributeValue = (data: Record<string, any>) => {
    const { id, display_order, attr_id } = data;
    /* console.log(data);
    console.log(attributes); */
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

          <AttributeBoxes
            attributes={attributes}
            onDeleteAttribute={handleDeleteAttribute}
            onDeleteAttributeValue={handleDeleteAttributeValue}
            onOrderAttribute={handleOrderAttribute}
            onOrderAttributeValue={handleOrderAttributeValue}
          />

          <Button color="success" className="text-white">
            ثبت ویژگی های محصولات
          </Button>
        </CardBody>
      </Card>

      <AddNewAttributesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(data) => setAttributes((prev) => [...prev, data])}
      />
    </>
  );
};

export default AttributesProducts;
