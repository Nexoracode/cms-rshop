"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TfiLayoutSlider } from "react-icons/tfi";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { BiLayout } from "react-icons/bi";
import { HeroSlider } from "./hero-slider.types";

type HeroSliderLayoutModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  sliders: HeroSlider[];
};

const HeroSliderLayoutModal: React.FC<HeroSliderLayoutModalProps> = ({
  isOpen,
  onOpenChange,
  sliders,
}) => {
  console.log("sliders =>", sliders);

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      trigger={
        <ActionButton
          icon={<BiLayout size={18} />}
          className="text-purple-700 bg-purple-200"
        />
      }
      triggerProps={null}
      title={"ترتیب اسلایدرها"}
      confirmText={"ثبت تغیرات"}
      size="3xl"
      icon={<TfiLayoutSlider />}
      isActiveFooter={false}
    ></BaseModal>
  );
};

export default HeroSliderLayoutModal;
