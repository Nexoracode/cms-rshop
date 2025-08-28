"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useState } from "react";
import AddNewAttributesModal from "./AttributesProduct/AddNewAttributesModal";
import AttributeBoxes from "./AttributesProduct/AttributeBoxes";
import {
  useUpdateAttribute,
  useUpdateAttributeValue,
} from "@/hooks/useAttribute";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attributes, setAttributes] = useState<any[]>([]);

  // هوک‌های mutate
  const updateAttributeMutation = useUpdateAttribute(0, undefined);
  const updateAttributeValueMutation = useUpdateAttributeValue(0, undefined);

  const handleDeleteAttribute = (attrId: number) => {
    setAttributes((prev) => prev.filter((a) => a.attr.id !== attrId));
  };

  const handleDeleteAttributeValue = (valId: number) => {
    setAttributes((prev) =>
      prev.map((a) => ({
        ...a,
        values: a.values.filter((v: any) => v.id !== valId),
      }))
    );
  };

  const handleOrderAttribute = (data: Record<string, any>) => {
    
    console.log(data);
    

    /* updateAttributeMutation.mutate(
      { id, ...updatedAttr },
      {
        onSuccess: (res: any) => {
          setAttributes((prev) =>
            prev.map((a) => (a.attr.id === res.attr.id ? res : a))
          );
        },
      }
    ); */
  };

  const handleOrderAttributeValue = (data: Record<string, any>) => {

    console.log(data);

    /*     updateAttributeValueMutation.mutate(
      { id, ...updatedValue },
      {
        onSuccess: (res: any) => {
          console.log(res);
          
          setAttributes((prev) =>
            prev.map((a, idx) =>
              idx === attributeIndex
                ? {
                    ...a,
                    values: a.values.map((v: any) =>
                      v.id === res.id ? res : v
                    ),
                  }
                : a
            )
          );
        },
      }
    ); */
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
