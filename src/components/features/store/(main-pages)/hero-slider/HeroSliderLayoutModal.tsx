"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TfiLayoutSlider } from "react-icons/tfi";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { BiLayout } from "react-icons/bi";
import { HeroSlider } from "./hero-slider.types";
import Image from "next/image";

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
    >
      <div className="flex items-center gap-1 mx-auto -mb-8">
        {sliders.map((slider, index) => {
          const textColor = !slider.image_url
            ? !slider.is_dark
              ? "text-black"
              : "text-white"
            : "text-white";

          return (
            <div
              key={index}
              className={`hover-reveal-parent w-28 h-28 rounded select-none flex items-end cursor-pointer ${
                !slider.image_url ? `rounded-2xl` : "bg-black/80"
              }`}
              style={{
                backgroundColor: !slider.image_url
                  ? slider.background_color || "gray"
                  : "",
              }}
            >
              <p className={`text-md truncate z-10 w-full pr-2 pb-1 ${textColor}`}>{slider.title}</p>

              {slider.image_url ? (
                <Image
                  src={slider.image_url}
                  alt={slider.title}
                  fill
                  priority
                  className="object-cover absolute inset-0 z-0 opacity-40"
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </BaseModal>
  );
};

export default HeroSliderLayoutModal;
