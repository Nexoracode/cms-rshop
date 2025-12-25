"use client";

import Image from "next/image";
import { HeroSlider } from "./hero-slider.types";
import StatusBadge from "@/components/shared/StatusBadge";
import { Chip } from "@heroui/react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteHeroSlider } from "@/core/hooks/api/adminHome/useHeroSlider";
import HeroSliderFormModal from "./HeroSliderFormModal";

type HeroSlidersTemplateProps = {
  slider: HeroSlider;
  zIndex?: number;
};

const HeroSlidersTemplate: React.FC<HeroSlidersTemplateProps> = ({
  slider,
  zIndex,
}) => {
  const { mutate: deleteSlider } = useDeleteHeroSlider();

  return (
    <div
      key={slider.id}
      className="absolute inset-0 cursor-pointer"
      style={{ zIndex }}
    >
      <div
        className={`hover-reveal-parent w-full h-full flex items-center px-5 ${
          !slider.image_url
            ? `border-2 rounded-2xl bg-[${slider.background_color || "gray"}]`
            : "bg-black/70"
        }`}
      >
        <div className="hover-reveal-child flex items-center gap-2">
          <HeroSliderFormModal />
          <DeleteButton onDelete={() => deleteSlider(slider.id)} />
        </div>

        {slider.background_color ? (
          <Chip
            variant="shadow"
            color={slider.is_dark ? "default" : "secondary"}
            size="sm"
            radius="sm"
            className={`absolute top-4 left-4 z-20`}
          >
            {slider.is_dark ? "تم تاریک" : "تم روشن"}
          </Chip>
        ) : (
          ""
        )}

        {!slider.is_active && (
          <StatusBadge
            isActive={false}
            className="absolute top-4 left-20 z-20"
          />
        )}

        {/* Content */}
        <div
          className={`relative z-10 w-full p-4 ${
            slider.is_dark ? "text-black" : "text-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2">{slider.title}</h2>

          {slider.description && (
            <p className="text-sm opacity-90 mb-4 truncate">
              {slider.description}
            </p>
          )}

          {slider.button_text && slider.button_link && (
            <div className="inline-block cursor-pointer px-4 py-2 rounded-lg bg-black/70 text-white text-sm hover:scale-95 transition">
              {slider.button_text}
            </div>
          )}
        </div>

        {/* Image */}
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
    </div>
  );
};

export default HeroSlidersTemplate;
