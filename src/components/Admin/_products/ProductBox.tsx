"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  useDisclosure,
  Checkbox,
  Tooltip,
} from "@heroui/react";
import { RiDeleteBin5Line, RiDeleteBinLine } from "react-icons/ri";
import { LuScrollText } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { useDeleteProduct } from "@/hooks/api/products/useProduct";
import DynamicModal from "@/components/Helper/DynamicModal";
import { FiShoppingBag } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { IoEyeOffOutline, IoSparklesOutline } from "react-icons/io5";

type Props = {
  id: number;
  title: string;
  pathImg: string;
  onShowInfos: () => void;
  onShowVariant: () => void;
  varientsCount: string | number;
  created_at: string;
  onSelect?: (id: number, selected: boolean) => void; // ارسال به parent
  cancleRemove: any[];
  price: string | number;
  originalPrice: number | undefined;
  isVisible: boolean;
  category: string;
  isFeatured: boolean;
};

const ProductBox: React.FC<Props> = ({
  id,
  created_at,
  title,
  onShowInfos,
  price,
  varientsCount,
  pathImg,
  onShowVariant,
  onSelect,
  isVisible,
  cancleRemove,
  isFeatured,
  originalPrice,
  category,
}) => {
  const { mutate: deleteProduct } = useDeleteProduct(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!cancleRemove.length) {
      setHovered(false);
      setSelected(false);
    }
  }, [cancleRemove]);

  // توگل کردن selected و اطلاع به parent
  const toggleSelected = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    onSelect?.(id, newSelected);
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
          onClick={toggleSelected} // کلیک روی بدنه -> select
          className="relative cursor-pointer p-2"
        >
          {/* Checkbox */}
          {hovered || selected ? (
            <Tooltip
              closeDelay={2000}
              color="primary"
              showArrow
              placement="left"
              content="انتخاب محصول (حذف گروهی)"
              className="text-white"
            >
              <div className="absolute bg-sky-500/30 pr-3 pl-0.5 py-2 rounded-xl z-10">
                <Checkbox
                  isSelected={selected}
                  onValueChange={(newValue) => {
                    setSelected(newValue);
                    onSelect?.(id, newValue);
                  }}
                />
              </div>
            </Tooltip>
          ) : (
            ""
          )}

          <div className="flex flex-col items-center sm:flex-row gap-4 text-start">
            <div className="relative w-fit h-full">
              <img
                alt="product cover"
                className={`object-cover w-full sm:w-[130px] h-[188px] sm:h-[110px] rounded-xl`}
                src={
                  "https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1300/q_auto/f_auto/hiking_dog_mountain"
                }
              />
              {!isVisible ? (
                <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
                  <p className="animate-bounce">عدم نمایش</p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="w-full sm:h-[110px] flex flex-col justify-between pr-0 sm:p-2 gap-4">
              <div className="flex flex-col gap-3 sm:flex-row justify-between items-center w-full">
                <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
                  <p className="truncate max-w-[220px] sm:max-w-[240px]">
                    {title}
                  </p>{" "}
                  <span className="text-gray-600 text-xs">({category})</span>
                </div>

                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowInfos();
                      }}
                      className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                    >
                      <TbEdit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowVariant();
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
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2 sm:gap-1">
                  <div className="flex items-center gap-2">
                    {isFeatured && (
                      <IoSparklesOutline className="text-fuchsia-500 text-xl animate-pulse" />
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
                        {Number(price).toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  ) : (
                    <span className="text-[15px] text-gray-800">
                      {Number(price).toLocaleString("fa-IR")} تومان
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
