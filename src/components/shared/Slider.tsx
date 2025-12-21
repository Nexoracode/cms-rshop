"use client";

import React, { ReactNode, useMemo, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type SliderProps<T> = {
  items: T[];
  itemsPerView?: number;
  renderItem: (item: T, index: number) => ReactNode;
};

function Slider<T>({
  items,
  itemsPerView = 1,
  renderItem,
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleItems = useMemo(
    () => items.slice(currentIndex, currentIndex + itemsPerView),
    [items, currentIndex, itemsPerView]
  );

  if (!items.length) return null;

  return (
    <div className="relative group w-full h-full">
      <div
        className="grid gap-4 h-full"
        style={{ gridTemplateColumns: `repeat(${itemsPerView}, 1fr)` }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-full rounded-2xl"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {items.length > itemsPerView && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20
            bg-black/40 text-white w-9 h-9 rounded-full
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition"
          >
            <MdArrowBackIos />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20
            bg-black/40 text-white w-9 h-9 rounded-full
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition"
          >
            <MdArrowForwardIos />
          </button>
        </>
      )}
    </div>
  );
}

export default Slider;
