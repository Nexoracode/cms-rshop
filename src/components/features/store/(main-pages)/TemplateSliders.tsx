"use client";

import React from "react";
import SideBannersTemplate from "./side-banner/SideBannersTemplate";
import { SideBanner } from "./side-banner/side-banner.types";
import { HeroSlider } from "./hero-slider/hero-slider.types";
import HeroSliderContainer from "./hero-slider/HeroSliderContainer";
import CategoriesSliderContainer from "./categories/CategoriesSliderContainer";

type TemplateSlidersProps = {
  sideBanners?: SideBanner[];
  sliders?: HeroSlider[];
  categories?: any[];
  brands?: any[];
  sections?: any[];
};

const TemplateSliders: React.FC<TemplateSlidersProps> = ({
  sideBanners = [],
  sliders = [],
  categories = [],
}) => {
  console.log("sliders =>", sliders);
  console.log("sideBanners =>", sideBanners);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        {/* Hero Sliders */}
        <HeroSliderContainer sliders={sliders} />

        {/* Side Banners */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {sideBanners.map((banner) => (
            <SideBannersTemplate key={banner.id} banner={banner} />
          ))}
        </div>
      </div>
      <div className="w-full h-28 bg-gray-100 rounded-xl animate-pulse"></div>

      <CategoriesSliderContainer categories={categories} />
    </div>
  );
};

export default TemplateSliders;
