"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";

type Collection = Record<string, any>;

interface CollectionVariantsCardProps {
  collection: Collection;
  children?: React.ReactNode;
  contentCollection?: React.ReactNode;
}

const CollectionVariantsCard: React.FC<CollectionVariantsCardProps> = ({
  collection,
  children,
  contentCollection,
}) => {
  const content = (
    <BaseCard
      className={`hover-reveal-parent`}
      bodyClassName={`flex flex-col items-center sm:flex-row gap-4 text-start p-1`}
    >
      {contentCollection}

      <div className="relative w-fit h-full">
        <img
          alt="collection cover"
          className="object-cover w-full sm:w-[130px] h-[188px] sm:h-[110px] rounded-xl"
          src={collection.media_pinned?.url ?? collection.image}
        />
        {!collection.is_visible && (
          <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
            <p className="animate-bounce">عدم نمایش</p>
          </div>
        )}
      </div>

      <div className="w-full sm:h-[110px] flex flex-col justify-between pr-0 sm:p-2 gap-4">
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center w-full">
          <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
            <p className="truncate max-w-[220px] sm:max-w-[240px]">
              {collection.name ?? collection.title}
            </p>
            <span className="text-gray-600 text-xs">
              ({collection.category?.title})
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2 cursor-auto">
            <p className="text-gray-600 text-[13px]">
              موجودی{" "}
              {collection.is_limited_stock
                ? "نامحدود"
                : collection.stock === 0
                ? "ندارد"
                : `${collection.stock} عدد`}
            </p>
          </div>

          <div className="flex items-end">
            <div className="text-gray-600">
              {collection.discount_amount > 0 ||
              collection.discount_percent > 0 ? (
                <div className="flex flex-col items-end gap-2 sm:gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
                      {Number(collection.price).toLocaleString("fa-IR")}
                    </span>
                    <span>تومان</span>
                  </div>
                  <span className="text-[15px] text-gray-800">
                    {Number(
                      Math.max(
                        0,
                        collection.price -
                          (collection.discount_amount > 0
                            ? collection.discount_amount
                            : (collection.discount_percent / 100) *
                              collection.price)
                      )
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </span>
                </div>
              ) : (
                <span className="text-[15px] text-gray-800">
                  {Number(collection.price).toLocaleString("fa-IR")} تومان
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );

  return children
    ? React.cloneElement(children as React.ReactElement, {
        children: content,
      })
    : content;
};

export default CollectionVariantsCard;
