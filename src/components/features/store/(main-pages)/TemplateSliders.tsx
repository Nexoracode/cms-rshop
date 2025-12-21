"use client";

import React from "react";
import SideBannersTemplate from "./side-banner/SideBannersTemplate";
import HeroSlidersTemplate from "./hero-slider/HeroSlidersTemplate";
import { SideBanner } from "./side-banner/side-banner.types";
import { HeroSlider } from "./hero-slider/hero-slider.types";
import HeroSliderContainer from "./hero-slider/HeroSliderContainer";

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
      <HeroSliderContainer sliders={sliders}/>

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
