"use client";

import React, { ReactNode, useMemo, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type SliderProps<T> = {
  items: T[];
  itemsPerView?: number; // تعداد اسلاید کنار هم
  rows?: number;         // تعداد آیتم عمودی داخل هر اسلاید
  rowHeight?: number | string; // ارتفاع هر row
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  childClassName?: string;
};

function Slider<T>({
  items,
  itemsPerView = 1,
  rows = 1,
  rowHeight = "1fr",
  renderItem,
  className = "",
  childClassName = "",
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // هر اسلاید شامل rows آیتم است
  const slideItems = useMemo(() => {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += rows) {
      result.push(items.slice(i, i + rows));
    }
    return result;
  }, [items, rows]);

  const maxIndex = Math.max(0, slideItems.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleSlides = useMemo(
    () => slideItems.slice(currentIndex, currentIndex + itemsPerView),
    [slideItems, currentIndex, itemsPerView]
  );

  if (!items.length) return null;

  const rowTemplate =
    typeof rowHeight === "number"
      ? `repeat(${rows}, ${rowHeight}px)`
      : `repeat(${rows}, ${rowHeight})`;

  return (
    <div className="relative group w-full h-full">
      <div
        className={`grid gap-4 h-full ${className}`}
        style={{ gridTemplateColumns: `repeat(${itemsPerView}, 1fr)` }}
      >
        {visibleSlides.map((group, slideIndex) => (
          <div
            key={slideIndex}
            className="grid gap-2"
            style={{ gridTemplateRows: rowTemplate }}
          >
            {group.map((item, itemIndex) => (
              <div key={itemIndex} className={`relative w-full h-full flex justify-center items-center ${childClassName}`}>
                {renderItem(item, itemIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {slideItems.length > itemsPerView && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10
            bg-black/40 text-white w-9 h-9 rounded-full
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition"
          >
            <MdArrowBackIos />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10
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
