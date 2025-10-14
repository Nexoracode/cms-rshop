// components/Admin/_products/ProductBox.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Checkbox,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { useDeleteProduct } from "@/hooks/api/products/useProduct";
import DynamicModal from "@/components/Helper/DynamicModal";
import { FiShoppingBag } from "react-icons/fi";
import { TbEdit, TbTruckDelivery } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  product: any;
  onShowInfos?: (productId: number) => void;
  onShowVariant?: (productId: number) => void;
  // onSelect now may receive (id, selected, product)
  onSelect?: (id: number, selected: boolean, product?: any) => void;
  cancleRemove: any[]; // parent selection list
  initialSelected?: boolean; // NEW: allow pre-selecting this card
  disableSelect?: boolean;
  disableAction?: boolean;
};

const ProductBox: React.FC<Props> = ({
  product,
  onShowInfos,
  onShowVariant,
  onSelect,
  cancleRemove,
  initialSelected = false,
  disableSelect,
  disableAction=false
}) => {
  const router = useRouter();
  const id = product?.id;

  const { mutate: deleteProduct } = useDeleteProduct(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<boolean>(!!initialSelected);

  // sync when parent clears (cancleRemove) — keep minimal logic to avoid loops
  useEffect(() => {
    if (!Array.isArray(cancleRemove) || cancleRemove.length === 0) {
      setHovered(false);
      setSelected(false);
    } else {
      // if parent includes this id, set selected
      const found = cancleRemove.some(
        (it: any) => it === id || (it && typeof it === "object" && it.id === id)
      );
      if (found !== selected) setSelected(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancleRemove, id]);

  // internal calculations
  const priceNum = Number(product?.price ?? 0);
  const discountAmount = Number(product?.discount_amount ?? 0);
  const discountPercent = Number(product?.discount_percent ?? 0);
  const discountValue =
    discountAmount > 0 ? discountAmount : (discountPercent / 100) * priceNum;
  const finalPrice = Math.max(0, Math.round(priceNum - discountValue));
  const originalPrice = discountValue > 0 ? priceNum : undefined;

  const varientsCount = product?.is_limited_stock
    ? "نامحدود"
    : product?.stock === 0
    ? "ندارد"
    : `${product?.stock ?? 0} عدد`;

  const pathImg = product?.media_pinned?.url ?? product?.image ?? "";
  const title = product?.name ?? product?.title ?? "بدون عنوان";
  const category = product?.category?.title ?? "";
  const isVisible = !!product?.is_visible;
  const isFeatured = !!product?.is_featured;
  const isSameDayShipping = !!product?.is_same_day_shipping;

  const handleShowInfos = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    if (onShowInfos) return onShowInfos(id);
    router.push(`/admin/products/create?edit_id=${id}&type=infos`);
  };

  const handleShowVariant = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    if (onShowVariant) return onShowVariant(id);
    router.push(`/admin/products/create?edit_id=${id}&type=variant`);
  };

  const toggleSelected = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    // send id, newSelected and the whole product object
    onSelect?.(id, newSelected, product);
  };

  return (
    <>
      <Card
        isBlurred
        className={`max-w-[300px] w-full sm:max-w-full border shadow-md relative hover:shadow-lg !transition-all ${
          selected
            ? "shadow-none border border-sky-500 hover:shadow-none scale-95"
            : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardBody
          onClick={disableSelect ? undefined : toggleSelected}
          className="relative cursor-pointer p-2"
        >
          {!disableSelect && (hovered || selected) ? (
            <Tooltip
              closeDelay={2000}
              color="primary"
              showArrow
              placement="left"
              content="انتخاب محصول"
              className="text-white"
            >
              <div className="absolute bg-sky-500/30 pr-3 pl-0.5 py-2 rounded-xl z-10">
                <Checkbox
                  isSelected={selected}
                  onValueChange={(newValue) => {
                    setSelected(newValue);
                    onSelect?.(id, newValue, product);
                  }}
                />
              </div>
            </Tooltip>
          ) : null}

          <div className="flex flex-col items-center sm:flex-row gap-4 text-start">
            <div className="relative w-fit h-full">
              <img
                alt="product cover"
                className={`object-cover w-full sm:w-[130px] h-[188px] sm:h-[110px] rounded-xl`}
                src={pathImg}
              />
              {!isVisible ? (
                <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
                  <p className="animate-bounce">عدم نمایش</p>
                </div>
              ) : null}
            </div>

            <div className="w-full sm:h-[110px] flex flex-col justify-between pr-0 sm:p-2 gap-4">
              <div className="flex flex-col gap-3 sm:flex-row justify-between items-center w-full">
                <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
                  <p className="truncate max-w-[220px] sm:max-w-[240px]">
                    {title}
                  </p>{" "}
                  <span className="text-gray-600 text-xs">({category})</span>
                </div>
                {!disableAction ? (
                  <div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowInfos(e);
                        }}
                        className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                      >
                        <TbEdit size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowVariant(e);
                        }}
                        className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                      >
                        <MdOutlineCategory size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen();
                        }}
                        className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                      >
                        <RiDeleteBin5Line size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2 sm:gap-1">
                  <div className="flex items-center gap-2">
                    {isFeatured && (
                      <IoSparklesOutline className="text-fuchsia-500 text-xl animate-pulse" />
                    )}
                    {isSameDayShipping && (
                      <TbTruckDelivery className="text-orange-500 text-xl" />
                    )}
                  </div>
                  <p className="text-gray-600 text-[13px]">
                    موجودی {varientsCount}
                  </p>
                </div>

                <div className="text-gray-600">
                  {originalPrice != null ? (
                    <div className="flex flex-col items-end gap-2 sm:gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
                          {Number(originalPrice).toLocaleString("fa-IR")}
                        </span>
                        <span>تومان</span>
                      </div>

                      <span className="text-[15px] text-gray-800">
                        {Number(finalPrice).toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  ) : (
                    <span className="text-[15px] text-gray-800">
                      {Number(finalPrice).toLocaleString("fa-IR")} تومان
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="تایید حذف محصول"
        confirmText="حذف محصول"
        onConfirm={() => deleteProduct()}
        icon={<FiShoppingBag className="text-3xl" />}
      >
        <p className="leading-7 text-danger-600">
          با حذف محصول دیگر این محصول قابل برگشت نیست!! آیا از حذف اطمینان
          دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default ProductBox;
