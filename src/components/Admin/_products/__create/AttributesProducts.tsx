"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import SubAttributeBox from "./helpers/SubAttributeBox";
import AddNewAttributesModal from "./AttributesProduct/AddNewAttributesModal";
import AttributeBoxes from "./AttributesProduct/AttributeBoxes";
import { useGetOneAttribute } from "@/hooks/useAttribute";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attributes, setAttributes] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const { data: oneAttribute } = useGetOneAttribute(selectedId);

  useEffect(() => {
    if (oneAttribute) {
      setAttributes((prev) => [...prev, oneAttribute]);
      setSelectedId(undefined);
    }
  }, [oneAttribute]);

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
            onDeleteAttribute={() => {}}
            onDeleteAttributeValue={() => {}}
            onOrderAttribute={() => {}}
            onOrderAttributeValue={() => {}}
          />

          {/*  {attributes.length ? (
            attributes.map((attr, index) => (
              <SubAttributeBox
                key={index}
                titleCard={attr.attr.name}
                isVariable={attr.attr.is_variant}
                onHandleSubmit={() => {}}
              />
            ))
          ) : (
            <p className="text-gray-500 pr-2">
              ■ این محصول تنوع رنگ‌بندی و سایزبندی و ... دارد؟ از این بخش
              می‌تونید آنها را اضافه کنید.
            </p>
          )} */}
          <Button color="success" className="text-white">
            ثبت ویژگی های محصولات
          </Button>
        </CardBody>
      </Card>

      <AddNewAttributesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(data) => setSelectedId(data.attr.id)}
      />
    </>
  );
};

export default AttributesProducts;
