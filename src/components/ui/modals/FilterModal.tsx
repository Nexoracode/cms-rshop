"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DynamicModal from "./Modal";
import OptionButton from "../buttons/OptionButton";
import { IoFilter } from "react-icons/io5";
import { ModalSize } from ".";

type FilterModalProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onRemove?: () => void;
  size?: ModalSize
};

const FilterModal: React.FC<FilterModalProps> = ({
  title = "فیلتر",
  children,
  confirmText = "اعمال",
  cancelText = "حذف فیلتر",
  onConfirm,
  onRemove,
  size= "2xl"
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
    onRemove?.();
    router.push(pathname);
    closeModal();
  };

  return (
    <>
      <OptionButton
        title="فیلتر"
        icon={<IoFilter className="!text-[16px]" />}
        className="w-full sm:w-fit text-sky-600 bg-sky-100"
        onClick={openModal}
      />

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleClearFilters}
        icon={<IoFilter className="text-3xl text-sky-600 bg-sky-100 rounded-lg p-1"/>}
        size={size}
      >
        {children}
      </DynamicModal>
    </>
  );
};

export default FilterModal;
