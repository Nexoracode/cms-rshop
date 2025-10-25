"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { MdOutlineCategory } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";

type Props = {
  product: any;
  disableAction?: boolean;
};

const ProductCard: React.FC<Props> = ({ product, disableAction = false }) => {
  const id = product.id;

  return (
    <BaseCard
      className="min-w-[300px] w-full sm:max-w-full"
      bodyClassName="flex flex-col items-center sm:flex-row gap-4"
      redirect={`/admin/products/create?edit_id=${id}&type=infos`}
    >
      <div className="relative w-full sm:w-[130px] h-[188px] sm:h-[110px]">
        <img
          alt="product cover"
          src={product.media_pinned?.url ?? product.image}
          className="object-cover w-full h-full rounded-xl"
        />
        {!product.is_visible && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-600/60 text-white text-lg rounded-lg shadow-lg">
            <p className="animate-bounce">عدم نمایش</p>
          </div>
        )}
      </div>

      <div className="w-full sm:h-[110px] flex flex-col justify-between gap-4 sm:p-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">
          <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
            <p className="truncate max-w-[220px] sm:max-w-[240px]">
              {product.name ?? product.title}
            </p>
            <span className="text-gray-600 text-xs">
              ({product.category?.title})
            </span>
          </div>

          {!disableAction && (
            <div className="flex gap-2">
              <ActionButton
                icon={<MdOutlineCategory size={18} />}
                route={`/admin/products/create?edit_id=${id}&type=variant`}
                className={product?.variants?.length ? "bg-purple-100 text-purple-600" : ""}
              />
              <DeleteButton
                onDelete={() => {
                  /* mutate hook اینجا */
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {product.is_featured && (
                <IoSparklesOutline className="text-fuchsia-500 text-xl animate-pulse" />
              )}
              {product.is_same_day_shipping && (
                <TbTruckDelivery className="text-orange-500 text-xl" />
              )}
            </div>
            <p className="text-gray-600 text-[13px]">
              موجودی{" "}
              {product.is_limited_stock
                ? "نامحدود"
                : product.stock === 0
                ? "ندارد"
                : `${product.stock} عدد`}
            </p>
          </div>

          <div className="flex items-end text-gray-600">
            {product.discount_amount > 0 || product.discount_percent > 0 ? (
              <div className="flex flex-col items-end gap-2 sm:gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
                    {Number(product.price).toLocaleString("fa-IR")}
                  </span>
                  <span>تومان</span>
                </div>
                <span className="text-[15px] text-gray-800">
                  {Number(
                    Math.max(
                      0,
                      product.price -
                        (product.discount_amount > 0
                          ? product.discount_amount
                          : (product.discount_percent / 100) * product.price)
                    )
                  ).toLocaleString("fa-IR")}{" "}
                  تومان
                </span>
              </div>
            ) : (
              <span className="text-[15px] text-gray-800">
                {Number(product.price).toLocaleString("fa-IR")} تومان
              </span>
            )}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default ProductCard;
