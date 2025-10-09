"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { FiAlertCircle } from "react-icons/fi";

type DynamicModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  onConfirm: () => void;
  icon?: React.ReactNode
  confirmColor?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  confirmVariant?: "flat" | "bordered" | "ghost" | "light" | "shadow" | "solid";
  placement?: "auto" | "center" | "top" | "bottom";
};

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onOpenChange,
  title= "توجه",
  children,
  confirmText = "حذف",
  onConfirm,
  confirmColor = "danger",
  confirmVariant = "flat",
  placement = "auto",
  icon= <FiAlertCircle className="text-2xl text-orange-400"/>
}) => {
  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={placement}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title ? (
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex text-orange-400 animate-bounce items-center gap-2 font-normal">
                  {icon}
                  <p>{title}</p>
                </div>
              </ModalHeader>
            ) : (
              ""
            )}
            <ModalBody className="leading-7">{children}</ModalBody>
            <ModalFooter className="flex gap-2 justify-end">
              <Button color="default" variant="flat" onPress={onClose}>
                لغو
              </Button>
              <Button
                color={confirmColor}
                variant={confirmVariant}
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DynamicModal;
