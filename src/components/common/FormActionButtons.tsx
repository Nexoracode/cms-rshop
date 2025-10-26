"use client";

import React from "react";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { IoArrowForwardOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

type Props = {
  cancelHref: string;
  onSubmit: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
};

const FormActionButtons: React.FC<Props> = ({
  cancelHref,
  onSubmit,
  submitText = "ثبت تغییرات",
  cancelText = "لغو",
  isSubmitting = false,
}) => {
  return (
    <div className="flex items-center gap-3 px-4">
      <OptionButton
        title={cancelText}
        href={cancelHref}
        icon={<IoArrowForwardOutline />}
        size="md"
        className="w-full"
      />
      <OptionButton
        title={isSubmitting ? "در حال ثبت..." : submitText}
        onClick={onSubmit}
        variant="flat"
        size="md"
        icon={<FiCheckCircle />}
        className="w-full bg-primary text-white"
      />
    </div>
  );
};

export default FormActionButtons;
