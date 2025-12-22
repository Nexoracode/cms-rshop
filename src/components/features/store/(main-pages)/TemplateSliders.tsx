"use client";

import React, { useEffect } from "react";
import SideBannersTemplate from "./side-banner/SideBannersTemplate";
import { SideBanner } from "./side-banner/side-banner.types";
import { HeroSlider } from "./hero-slider/hero-slider.types";
import HeroSliderContainer from "./hero-slider/HeroSliderContainer";
import CategoriesSliderContainer from "./categories/CategoriesSliderContainer";
import { IoIosStar } from "react-icons/io";
import BrandsSliderContainer from "./brands/BrandsSliderContainer";
import SectionsSliderContainer from "./sections/SectionsSliderContainer";
import FeaturedOffersSection from "./FeaturedOffersSection/FeaturedOffersSection";
import PromoBanner from "./PromoBanner";
import AddSectionCard from "./shared/AddSectionCard";

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
  sections = [],
}) => {
  const [featuredSection, setFeaturedSection] = React.useState(null);
  const [otherSection, setOtherSection] = React.useState<any[]>([]);
  console.log("sections =>", sections);

  useEffect(() => {
    const findedFeatured = sections.find(
      (section) => section.section_type === "featured"
    );
    const findedOther = sections.filter(
      (section) => section.section_type !== "featured"
    );
    findedOther && setOtherSection(findedOther);
    findedFeatured && setFeaturedSection(findedFeatured);
  }, [sections]);

  return (
    <div className="flex flex-col gap-6 select-none">
      <PromoBanner />
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
      {featuredSection && (
        <FeaturedOffersSection featuredSection={featuredSection} />
      )}
      <AddSectionCard
        label="ویژگی ها و خدمات (مزایای سایت)"
        onClick={() => console.log("اضافه شد!")}
        className="!border-gray-600 !text-gray-600 !bg-gray-50"
      />
      <CategoriesSliderContainer categories={categories} />
      <div className="flex flex-col gap-10 justify-center items-center">
        <SectionsSliderContainer sections={otherSection} />
      </div>
      <BrandsSliderContainer brands={brands} />
    </div>
  );
};

export default TemplateSliders;
