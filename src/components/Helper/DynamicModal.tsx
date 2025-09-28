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

type DynamicModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText: string; // متن دکمه اصلی
  onConfirm: () => void; // تابع وقتی دکمه اصلی کلیک شد
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
  title,
  children,
  confirmText,
  onConfirm,
  confirmColor = "primary", // پیش‌فرض primary
  confirmVariant = "solid",  // پیش‌فرض solid
  placement = "auto",
}) => {
  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement={placement}>
      <ModalContent>
        {(onClose) => (
          <>
            {title && <ModalHeader className="flex flex-col gap-1"><p className="font-normal">{title}</p></ModalHeader>}
            <ModalBody>{children}</ModalBody>
            <ModalFooter className="flex gap-2 justify-end">
              <Button color="danger" variant="light" onPress={onClose}>
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
