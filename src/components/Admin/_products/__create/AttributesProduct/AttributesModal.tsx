import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { AttributesContent } from "./AttributesContent";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AttributesModal = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        <ModalHeader />
        <ModalBody>
          <AttributesContent onSubmitted={onOpenChange} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default AttributesModal;
