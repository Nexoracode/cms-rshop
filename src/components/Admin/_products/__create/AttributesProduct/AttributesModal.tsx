"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import { useGetAllAttribute } from "@/hooks/attributes/useAttribute";
import { useGetAttributeValues } from "@/hooks/attributes/useAttributeValue";
import { useGetAllAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { useState } from "react";
import AddNewAttrGroup from "./AttributeGroup/AddNewAttrGroup";
import AddNewAttribute from "./Attribute/AddNewAttribute";

type AttributeData = {
  attr: Record<string, any>;
  values: Record<string, any>[];
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (data: AttributeData) => void;
};

const AttributesModal = ({ isOpen, onOpenChange, onSubmit }: Props) => {
  const [selectedAttrGroup, setSelectedAttrGroup] = useState<
    number | undefined
  >(undefined);
  const [selectedAttr, setSelectedAttr] = useState<number | undefined>(
    undefined
  );
  const [selectedAttrValue, setSelectedAttrValue] = useState<
    number | undefined
  >(undefined);
  const [attrValues, setAttrValues] = useState<any>([]);
  //? Hooks
  const { data: attributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(selectedAttrGroup);
  const { data: attributeValues } = useGetAttributeValues(selectedAttr);

  const resetModalInfos = () => {
    onOpenChange();
    setSelectedAttrGroup(undefined);
    setSelectedAttr(undefined);
    setAttrValues([]);
  };

  const handleChangesCategoryAttributes = () => {
    const attr = attributes?.data.find((a: any) => a.id === selectedAttr);

    const values = attributeValues?.data.filter((v: any) =>
      attrValues.includes(v.id.toString())
    );

    if (attr && values?.length) {
      onSubmit({ attr: attr, values: values });
      resetModalInfos();
    }
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={resetModalInfos}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px]">افزودن ویژگی محصول</p>
              <Button
                variant="flat"
                className="text-xl"
                size="sm"
                onPress={() => {}}
              >
                <TbSettings />
              </Button>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <AddNewAttrGroup
                onChange={(value) => {
                  setSelectedAttrGroup(value);
                  setSelectedAttr(undefined);
                  setSelectedAttrValue(undefined);
                  setAttrValues([]);
                }}
                attrGroup={attributeGroup?.data}
              />
              <AddNewAttribute
                onChange={(value) => {
                  setSelectedAttr(value);
                  setAttrValues([]);
                }}
                attr={attributes?.data}
                selectedAttrId={selectedAttr}
                groupedId={selectedAttrGroup}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                variant="solid"
                color="secondary"
                onPress={handleChangesCategoryAttributes}
                isDisabled={
                  !selectedAttr || !selectedAttrGroup || !attrValues.length
                    ? true
                    : false
                }
              >
                ثبت تغیرات
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AttributesModal;
