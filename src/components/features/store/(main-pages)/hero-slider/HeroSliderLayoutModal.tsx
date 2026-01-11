"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TfiLayoutSlider } from "react-icons/tfi";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { BiLayout } from "react-icons/bi";

type HeroSliderLayoutModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const HeroSliderLayoutModal: React.FC<HeroSliderLayoutModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      trigger={
        <ActionButton icon={<BiLayout size={18} />} className="text-purple-700 bg-purple-200"/>
      }
      triggerProps={null}
      title={"مرتب سازی اسلایدرها"}
      confirmText={"ثبت تغیرات"}
      size="3xl"
      icon={<TfiLayoutSlider />}
      isActiveFooter={false}
    ></BaseModal>
  );
};

export default HeroSliderLayoutModal;
