"use client";

import React from "react";
import SideBannersTemplate from "./side-banner/SideBannersTemplate";
import HeroSlidersTemplate from "./hero-slider/HeroSlidersTemplate";
import { SideBanner } from "./side-banner/side-banner.types";
import { HeroSlider } from "./hero-slider/hero-slider.types";

type TemplateSlidersProps = {
  sideBanners?: SideBanner[];
  sliders?: HeroSlider[];
};

const TemplateSliders: React.FC<TemplateSlidersProps> = ({
  sideBanners = [],
  sliders = [],
}) => {
  console.log("sliders =>", sliders);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Hero Sliders */}
      <div className="flex flex-col gap-4 relative w-full h-[320px] rounded-2xl overflow-hidden hover:scale-95 transition-all cursor-pointer">
        {sliders
          .filter((s) => s.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((slider, index) => (
            <HeroSlidersTemplate
              key={slider.id}
              slider={slider}
              zIndex={sliders.length - index}
            />
          ))}
      </div>

      {/* Side Banners */}
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {sideBanners.map((banner) => (
          <SideBannersTemplate key={banner.id} banner={banner} />
        ))}
      </div>
    </div>
  );
};

export default TemplateSliders;
