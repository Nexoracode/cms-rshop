"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewAttributeType = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px]">افزودن نوع ویژگی جدید</p>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-5"></div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className="w-full mt-4"
                onPress={() => {}}
              >
                افزودن نوع ویژگی
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewAttributeType;
