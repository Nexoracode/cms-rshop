"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "./hero-slider.types";
import StatusBadge from "@/components/shared/StatusBadge";

type HeroSlidersTemplateProps = {
  sliders: HeroSlider[];
};

const HeroSlidersTemplate: React.FC<HeroSlidersTemplateProps> = ({
  sliders,
}) => {
  const activeSliders = sliders
    ?.filter((s) => s.is_active)
    ?.sort((a, b) => a.sort_order - b.sort_order);

  if (!activeSliders?.length) return null;

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden">
      {activeSliders.map((slider, index) => (
        <div
          key={slider.id}
          className="absolute inset-0"
          style={{ zIndex: activeSliders.length - index }}
        >
          <div
            className="relative w-full h-full flex items-center px-10"
            style={{ backgroundColor: slider.background_color || "#000" }}
          >
            {!slider.is_active && (
              <StatusBadge
                isActive={false}
                size="sm"
                className="absolute top-4 left-4 z-20"
              />
            )}

            {/* Content */}
            <div
              className={`relative z-10 max-w-md ${
                slider.is_dark ? "text-black" : "text-white"
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">{slider.title}</h2>

              {slider.description && (
                <p className="text-sm opacity-90 mb-4">{slider.description}</p>
              )}

              {slider.button_text && slider.button_link && (
                <Link
                  href={slider.button_link}
                  className="inline-block px-4 py-2 rounded-lg bg-black/70 text-white text-sm hover:scale-95 transition"
                >
                  {slider.button_text}
                </Link>
              )}
            </div>

            {/* Image */}
            <Image
              src={slider.image_url}
              alt={slider.title}
              fill
              priority
              className="object-cover absolute inset-0 z-0 opacity-30"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlidersTemplate;
