"use client";

import React, { useState, cloneElement, isValidElement } from "react";
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
import OptionButton, { OptionButtonProps } from "../buttons/OptionButton";

type BaseModalProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  size?: ModalSize;
  trigger?: React.ReactNode;
  triggerProps?: Omit<OptionButtonProps, "onClick">; // ✅ پراپ‌های OptionButton
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  title = "توجه",
  children,
  confirmText = "تأیید",
  cancelText = "لغو",
  onConfirm,
  onCancel,
  confirmColor = "primary",
  confirmVariant = "flat",
  placement = "auto",
  icon = <FiAlertCircle className="text-orange-400" />,
  isConfirmDisabled = false,
  isActiveFooter = true,
  size = "md",
  trigger,
  triggerProps,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleOpenChange = (open: boolean) => {
    controlledOnOpenChange?.(open);
    setInternalOpen(open);
  };

  // اگر children یه React element باشه، onOpenChange رو بهش پاس بده
  const content =
    isValidElement(children) &&
    cloneElement(children as React.ReactElement<any>, {
      onOpenChange: handleOpenChange,
    });

  return (
    <>
      {/* ✅ trigger با دو حالت */}
      {trigger ? (
        <div onClick={() => handleOpenChange(true)}>{trigger}</div>
      ) : triggerProps ? (
        <OptionButton {...triggerProps} onClick={() => handleOpenChange(true)} />
      ) : null}

      {/* ✅ Modal */}
      <Modal
        dir="rtl"
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        placement={placement}
        size={size}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {title && (
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-normal">
                    <span className="text-2xl">{icon}</span>
                    <p className="text-[16px]">{title}</p>
                  </div>
                </ModalHeader>
              )}

              <ModalBody className="leading-7">{content || children}</ModalBody>

              {isActiveFooter && (
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
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
