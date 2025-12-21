"use client";

import React, { useEffect, useMemo, useState } from "react";
import HeroSlidersTemplate from "./HeroSlidersTemplate";
import { HeroSlider } from "./hero-slider.types";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type Props = {
  sliders?: HeroSlider[];
};

const HeroSliderContainer: React.FC<Props> = ({ sliders = [] }) => {
  const activeSliders = useMemo(
    () => sliders.sort((a, b) => a.sort_order - b.sort_order),
    [sliders]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === activeSliders.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeSliders.length - 1 : prev - 1
    );
  };

  if (!activeSliders.length) return null;

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden hover:scale-95 transition-all cursor-pointer group">
      <HeroSlidersTemplate slider={activeSliders[currentIndex]} />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20
        bg-black/40 text-white w-9 h-9 rounded-full
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition"
      >
        <MdArrowBackIos />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20
        bg-black/40 text-white w-9 h-9 rounded-full
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition"
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default HeroSliderContainer;
