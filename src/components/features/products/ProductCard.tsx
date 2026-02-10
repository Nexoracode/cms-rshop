"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { MdOutlineCategory } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import { useProductUpdate } from "@/core/hooks/api/products/useProduct";
import { PiResizeBold } from "react-icons/pi";

type Props = {
  product: any;
  disableAction?: boolean;
  forceMobileLayout?: boolean;
};

const ProductCard: React.FC<Props> = ({
  product,
  disableAction = false,
  forceMobileLayout = true,
}) => {
  const id = product.id;

  const { mutate: productUpdate } = useProductUpdate(id);
  console.log(product);

  return (
    <BaseCard
      className={`min-w-[250px] w-full ${
        forceMobileLayout ? "sm:flex-col" : ""
      }`}
      redirect={`/admin/products/create?edit_id=${id}&type=infos`}
      bodyClassName="flex flex-row items-center"
    >
      <div
        className={`w-full h-full flex flex-col items-center ${
          forceMobileLayout ? "sm:flex-row" : ""
        } gap-4`}
      >
        <div
          className={`relative w-full ${
            forceMobileLayout ? "sm:w-[130px] sm:h-[110px]" : ""
          } h-[188px]`}
        >
          <Image
            src={product.media_pinned?.url ?? product.image}
            alt="product cover"
            fill
            className="object-cover rounded-xl"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
          {!product.is_visible && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-600/60 text-white text-lg rounded-lg shadow-lg">
              <p className="animate-bounce">عدم نمایش</p>
            </div>
          )}
        </div>

        <div
          className={`w-full ${
            forceMobileLayout ? "sm:flex-col sm:p-2" : ""
          } flex flex-col justify-between gap-4`}
        >
          {/* Header */}
          <div
            className={`flex flex-col ${
              forceMobileLayout ? "sm:flex-row" : ""
            } justify-between items-center w-full gap-3`}
          >
            <div
              className={`text-[15px] text-black/80 flex flex-col ${
                forceMobileLayout ? "sm:flex-row" : ""
              } items-center gap-1`}
            >
              <p
                className={`truncate max-w-[220px] ${
                  forceMobileLayout ? "sm:max-w-[240px]" : ""
                }`}
              >
                {product.name ?? product.title}
              </p>
              <span className="text-gray-600 text-xs">
                {product?.category?.title ? `(${product.category.title})` : ""}
              </span>
            </div>

            {!disableAction && (
              <div className="flex gap-2">
                <ActionButton
                  icon={<MdOutlineCategory size={18} />}
                  route={`/admin/products/create?edit_id=${id}&type=variant`}
                  className={
                    product?.variants?.length
                      ? "bg-purple-100 text-purple-600"
                      : ""
                  }
                />
                <ActionButton
                  icon={<LuEye size={18} />}
                  onClick={() => {
                    productUpdate({ is_visible: !product.is_visible });
                  }}
                  className={`${product.is_visible ? "" : "text-orange-600 border-orange-300 bg-orange-100"} hover:text-orange-600 hover:border-orange-300 hover:bg-orange-100 !opacity-100`}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className={`bg-white p-1 flex items-center gap-2.5`}>
                {product.helper && (
                  <div className="bg-white rounded-lg border border-green-300 p-1">
                    <PiResizeBold className="text-green-600" size={16} />
                  </div>
                )}
                {product.is_featured && (
                  <div className="bg-white rounded-lg border border-fuchsia-300 p-1">
                    <IoSparklesOutline className="text-fuchsia-500" size={16} />
                  </div>
                )}
                {product.is_same_day_shipping && (
                  <div className="bg-white rounded-lg border border-fuchsia-300 p-1">
                    <TbTruckDelivery className="text-orange-500" size={16} />
                  </div>
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
                <div
                  className={`flex flex-col items-end gap-2 ${
                    forceMobileLayout ? "sm:gap-1" : ""
                  }`}
                >
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
                            : (product.discount_percent / 100) * product.price),
                      ),
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
      </div>
    </BaseCard>
  );
};

export default ProductCard;
