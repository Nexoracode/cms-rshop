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
import FormActionButtons from "@/components/common/FormActionButtons";

type BaseModalProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (
    close: (open: boolean) => void
  ) => void | boolean | Promise<boolean> | Promise<void>;
  onCancel?: () => void;
  icon?: React.ReactNode;
  placement?: "auto" | "center" | "top" | "bottom";
  isConfirmDisabled?: boolean;
  isActiveFooter?: boolean;
  size?: ModalSize;
  trigger?: React.ReactNode;
  triggerProps?: Omit<OptionButtonProps, "onClick"> | null; // ✅ پراپ‌های OptionButton
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
  placement = "auto",
  icon = <FiAlertCircle className="text-orange-400" />,
  isConfirmDisabled = false,
  isActiveFooter = true,
  size = "md",
  trigger,
  triggerProps= {title: "+ افزودن", className: "bg-secondary-light text-secondary"},
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleOpenChange = (open: boolean) => {
    controlledOnOpenChange?.(open);
    setInternalOpen(open);
  };

  const content =
    isValidElement(children) && typeof children.type !== "string"
      ? cloneElement(children as React.ReactElement<any>, {
          onOpenChange: handleOpenChange,
          isOpen,
        })
      : children;

  return (
    <>
      {/* ✅ trigger با دو حالت */}
      {trigger ? (
        <div onClick={() => handleOpenChange(true)}>{trigger}</div>
      ) : triggerProps ? (
        <OptionButton
          {...triggerProps}
          onClick={() => handleOpenChange(true)}
        />
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
                    <div className="text-[16px]">{title}</div>
                  </div>
                </ModalHeader>
              )}

              <ModalBody className="leading-7 max-h-[80vh] overflow-y-auto pl-4">
                {content || children}
                <div></div>
                {isActiveFooter && (
                  <FormActionButtons
                    cancelText={cancelText}
                    submitText={confirmText}
                    onCancel={() => {
                      onCancel?.();
                      onClose();
                    }}
                    onSubmit={async () => {
                      const shouldClose = await onConfirm?.(handleOpenChange);
                      console.log(shouldClose);
                      
                      if (shouldClose !== false) onClose();
                    }}
                    isSubmitting={isConfirmDisabled}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
