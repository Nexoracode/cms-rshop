"use client";

import React from "react";
import SideBannersTemplate from "./side-banner/SideBannersTemplate";
import { SideBanner } from "./side-banner/side-banner.types";
import { HeroSlider } from "./hero-slider/hero-slider.types";
import HeroSliderContainer from "./hero-slider/HeroSliderContainer";
import CategoriesSliderContainer from "./categories/CategoriesSliderContainer";
import { IoIosStar } from "react-icons/io";
import BrandsSliderContainer from "./brands/BrandsSliderContainer";
import { BiCategoryAlt } from "react-icons/bi";

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
  brands = [],
}) => {
  console.log("sliders =>", sliders);
  console.log("sideBanners =>", sideBanners);

  return (
    <div className="flex flex-col gap-8 select-none">
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

      <div className="flex flex-col gap-10 justify-center items-center">
        <p className="text-lg text-gray-700">خرید بر اساس دسته‌بندی</p>
        <CategoriesSliderContainer categories={categories} />
      </div>
      <div className="flex flex-col gap-10 justify-center items-center border border-gray-200 rounded-2xl pb-5 pt-2.5">
        <div className="flex items-center gap-2.5">
          <IoIosStar className="text-2xl text-yellow-400" />
          <p className="text-lg text-gray-700">محبوب‌ترین برندها</p>
        </div>
        <BrandsSliderContainer brands={brands} />
      </div>
      <div></div>
    </div>
  );
};

export default TemplateSliders;
