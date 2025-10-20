"use client";

import { Modal, ModalContent } from "@heroui/react";
import { AttributesContent } from "./AttributesContent";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AttributesModal = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        <AttributesContent onSubmitted={onOpenChange} />
      </ModalContent>
    </Modal>
  );
};

export default AttributesModal;
