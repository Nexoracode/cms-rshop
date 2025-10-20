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
import { ModalSize } from ".";

type DynamicModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  icon?: React.ReactNode;
  confirmColor?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  confirmVariant?: "flat" | "bordered" | "ghost" | "light" | "shadow" | "solid";
  placement?: "auto" | "center" | "top" | "bottom";
  isConfirmDisabled?: boolean;
  isActiveFooter?: boolean;
  size?: ModalSize
};

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onOpenChange,
  title = "توجه",
  children,
  confirmText = "تأیید",
  cancelText = "لغو",
  onConfirm,
  onCancel,
  confirmColor = "primary",
  confirmVariant = "flat",
  placement = "auto",
  icon = <FiAlertCircle className="text-2xl text-orange-400" />,
  isConfirmDisabled = false,
  isActiveFooter = true,
  size= "md"
}) => {
  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={placement}
      size={size}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title ? (
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-normal">
                  {icon}
                  <div>{title}</div>
                </div>
              </ModalHeader>
            ) : null}

            <ModalBody className="leading-7">{children}</ModalBody>
            {isActiveFooter ? (
              <ModalFooter className="flex gap-2 justify-end">
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => {
                    onCancel?.();
                    onClose();
                  }}
                >
                  {cancelText}
                </Button>

                <Button
                  color={confirmColor}
                  variant={confirmVariant}
                  isDisabled={isConfirmDisabled}
                  onPress={() => {
                    onConfirm?.();
                    onClose();
                  }}
                >
                  {confirmText}
                </Button>
              </ModalFooter>
            ) : (
              ""
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DynamicModal;
