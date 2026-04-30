"use client";

import React, { ReactNode, useMemo, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type SliderProps<T> = {
  items: T[];
  itemsPerView?: number;
  rows?: number;
  rowHeight?: number | string;
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

  const isMultiRow = rows > 1;

  // فقط وقتی لازم باشه group می‌کنیم
  const groupedItems = useMemo(() => {
    if (!isMultiRow) return items;

    const result: T[][] = [];
    for (let i = 0; i < items.length; i += rows) {
      result.push(items.slice(i, i + rows));
    }
    return result;
  }, [items, rows, isMultiRow]);

  const maxIndex = isMultiRow
    ? Math.max(0, (groupedItems as T[][]).length - itemsPerView)
    : Math.max(0, items.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleSlides = useMemo(() => {
    if (!isMultiRow) {
      return items.slice(currentIndex, currentIndex + itemsPerView);
    }

    return (groupedItems as T[][]).slice(
      currentIndex,
      currentIndex + itemsPerView
    );
  }, [items, groupedItems, currentIndex, itemsPerView, isMultiRow]);

  if (!items?.length) {
    return <div className="relative group w-full h-full" />;
  }

  const rowTemplate =
    typeof rowHeight === "number"
      ? `repeat(${rows}, ${rowHeight}px)`
      : `repeat(${rows}, ${rowHeight})`;

  return (
    <div className="relative group w-full h-full">
      <div
        className={`w-fit grid mx-auto gap-4 h-full ${className}`}
        style={{
          gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
        }}
      >
        {/* حالت ساده (row = 1) */}
        {!isMultiRow &&
          (visibleSlides as T[]).map((item, index) => (
            <div
              key={index}
              className={`relative w-full h-full flex justify-center items-center ${childClassName}`}
            >
              {renderItem(item, currentIndex + index)}
            </div>
          ))}

        {/* حالت multi-row */}
        {isMultiRow &&
          (visibleSlides as T[][]).map((group, slideIndex) => (
            <div
              key={slideIndex}
              className="grid gap-2"
              style={{ gridTemplateRows: rowTemplate }}
            >
              {group.map((item, itemIndex) => {
                const realIndex =
                  (currentIndex + slideIndex) * rows + itemIndex;

                return (
                  <div
                    key={realIndex}
                    className={`relative w-full h-full flex justify-center items-center ${childClassName}`}
                  >
                    {renderItem(item, realIndex)}
                  </div>
                );
              })}
            </div>
          ))}
      </div>

      {maxIndex > 0 && (
        <>
          <button
            onClick={next}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10
            bg-black/40 text-white w-9 h-9 rounded-full
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition"
          >
            <MdArrowBackIos />
          </button>

          <button
            onClick={prev}
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