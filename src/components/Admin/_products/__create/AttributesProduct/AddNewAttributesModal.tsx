"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewAttribute from "./AddNewAttribute";
import HeaderAction from "../helpers/HeaderAction";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewAttributesModal = ({ isOpen, onOpenChange }: Props) => {
  const {
    isOpen: isOpenAttr,
    onOpen: onOpenAttr,
    onOpenChange: onOpenChangeAttr,
  } = useDisclosure();

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
              <HeaderAction
                title={"ویژگی"}
                textBtn={"افزودن ویژگی جدید"}
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
