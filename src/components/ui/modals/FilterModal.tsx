"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DynamicModal from "./Modal";

type FilterModalProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  trigger?: React.ReactNode;
  onConfirm?: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  title = "فیلتر",
  children,
  confirmText = "اعمال",
  cancelText = "حذف فیلتر",
  trigger,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenChange = (open: boolean) => setIsOpen(open);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  const handleClearFilters = () => {
    router.push(pathname);
    closeModal();
  };

  return (
    <>
      {trigger ? <div onClick={openModal}>{trigger}</div> : null}

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleClearFilters}
      >
        {children}
      </DynamicModal>
    </>
  );
};

export default FilterModal;
