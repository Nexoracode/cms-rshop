"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewAttribute from "./AddNewAttribute";
import HeaderAction from "../helpers/HeaderAction";
import {
  useAddNewAttributeValue,
  useGetAllAttribute,
  useGetAllAttributeGroup,
  useGetAttributeValues,
} from "@/hooks/useAttribute";
import { useEffect, useState } from "react";
import AddNewAttributeGroup from "./AddNewAttributeGroup";
import GenericMultiSelect from "@/components/Helper/GenericMultiSelect";
import AddNewAttributeValue from "./AddNewAttributeValue";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewAttributesModal = ({ isOpen, onOpenChange }: Props) => {
  const [selectedAttrGroup, setSelectedAttrGroup] = useState(-1);
  const [selectedAttr, setSelectedAttr] = useState(-1);
  const [datas, setDatas] = useState({
    value: "",
    attribute_id: 1,
    display_color: "",
    display_order: null,
    is_active: true,
  });
  //
  const {
    isOpen: isOpenAttr,
    onOpen: onOpenAttr,
    onOpenChange: onOpenChangeAttr,
  } = useDisclosure();
  const {
    isOpen: isOpenTypeAttr,
    onOpen: onOpenTypeAttr,
    onOpenChange: onOpenChangeTypeAttr,
  } = useDisclosure();
  const {
    isOpen: isOpenTypeAttrValue,
    onOpen: onOpenTypeAttrValue,
    onOpenChange: onOpenChangeTypeAttrValue,
  } = useDisclosure();

  //? Hooks
  const { data: getAllAttributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(
    selectedAttrGroup !== -1 ? selectedAttrGroup : undefined
  );
  const { data: attributeValues } = useGetAttributeValues(
    selectedAttr !== -1 ? selectedAttr : undefined
  );
  const { mutate: createAttributeValue } = useAddNewAttributeValue();

  const addNewAttributeValue = () => {};

  const animals = [
    { key: "cat", title: "جدید" },
    { key: "dog", title: "قدیمی" },
    { key: "elephant", title: "تازه" },
  ];

  return (
    <>
      <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                <div className="mt-2">
                  <Select
                    isRequired
                    label="دسته بندی ویژگی"
                    placeholder="دسته بندی ویژگی را انتخاب کنید"
                    labelPlacement="outside"
                    onChange={(e) => setSelectedAttrGroup(+e.target.value)}
                  >
                    {getAllAttributeGroup?.data ? (
                      getAllAttributeGroup.data.map((item: any) => (
                        <SelectItem key={item.id}>{item.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
                    )}
                  </Select>

                  <HeaderAction
                    title={"در صورت نیاز میتوانید دسته بندی جدیدی اضافه کنید"}
                    textBtn={"+ افزودن"}
                    onPress={onOpenTypeAttr}
                  />
                </div>

                <div>
                  <Select
                    isRequired
                    label="ویژگی"
                    placeholder="ویژگی را انتخاب کنید"
                    labelPlacement="outside"
                    onChange={(e) => setSelectedAttr(+e.target.value)}
                  >
                    {attributes && attributes?.data ? (
                      attributes.data.map((item: any) => (
                        <SelectItem key={item.id}>{item.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
                    )}
                  </Select>

                  <HeaderAction
                    title={"در صورت نیاز میتوانید ویژگی جدیدی را اضافه کنید"}
                    textBtn={"+ افزودن"}
                    onPress={onOpenAttr}
                  />
                </div>

                {selectedAttr !== -1 ? (
                  <div>
                    <GenericMultiSelect label="مقادیر ویژگی" items={animals} />
                    <HeaderAction
                      title={"در صورت نیاز میتوانید مقدار جدیدی اضافه کنید"}
                      textBtn={"+ افزودن"}
                      onPress={onOpenTypeAttrValue}
                    />
                  </div>
                ) : (
                  ""
                )}

                <AddNewAttribute
                  isOpen={isOpenAttr}
                  onOpenChange={onOpenChangeAttr}
                />
              </ModalBody>
              <ModalFooter>
                <Button className="w-full" variant="solid" color="secondary">
                  ثبت تغیرات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AddNewAttributeGroup
        isOpen={isOpenTypeAttr}
        onOpenChange={onOpenChangeTypeAttr}
      />
      <AddNewAttributeValue
        isOpen={isOpenTypeAttrValue}
        onOpenChange={onOpenChangeTypeAttrValue}
      />
    </>
  );
};

export default AddNewAttributesModal;
