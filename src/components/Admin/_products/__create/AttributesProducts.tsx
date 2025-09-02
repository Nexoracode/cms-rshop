"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import AttributeBoxes from "./AttributesProduct/AttributeBoxes";
const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attributes, setAttributes] = useState<any[]>([]);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  // Handle Logic Delete Attribute or AttributeValue

  const handleDeleteAttribute = (attrId: number) =>
    setAttributes((prev) => prev.filter((a) => a.attr.id !== attrId));

  const handleDeleteAttributeValue = (valId: number) =>
    setAttributes((prev) =>
      prev.map((a) => ({
        ...a,
        values: a.values.filter((v: any) => v.id !== valId),
      }))
    );

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
