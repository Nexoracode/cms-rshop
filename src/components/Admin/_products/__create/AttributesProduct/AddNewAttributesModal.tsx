"use client";

import {
  Button,
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
} from "@/hooks/useAttribute";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewAttributesModal = ({ isOpen, onOpenChange }: Props) => {
  const [selectedAttrGroup, setSelectedAttrGroup] = useState(-1);
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
  //? Hooks
  const { data: getAllAttributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(
    selectedAttrGroup !== -1 ? selectedAttrGroup : undefined
  );
  const { mutate: createAttributeValue } = useAddNewAttributeValue();

  const addNewAttributeValue = () => {};
  
  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px]">افزودن ویژگی های محصول</p>
              <Button
                variant="flat"
                className="text-xl"
                size="sm"
                onPress={() => {}}
              >
                <TbSettings />
              </Button>
            </ModalHeader>
            <ModalBody>
              <Select
                label="نوع گروه ویژگی"
                placeholder="گروه ویژگی را انتخاب کنید"
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

              <Select
                label="نوع ویژگی"
                placeholder="ویژگی را انتخاب کنید"
                labelPlacement="outside"
                onChange={(e) =>
                  setDatas((prev) => ({
                    ...prev,
                    attribute_id: +e.target.value,
                  }))
                }
                className="!mt-8"
              >
                {attributes?.data ? (
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
  );
};

export default AddNewAttributesModal;
