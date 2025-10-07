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
        className={`border shadow-md relative hover:shadow-lg !transition-all ${
          selected
            ? "shadow-none border border-sky-500 hover:shadow-none scale-95"
            : ""
        } ${
          isFeatured
            ? `bg-gradient-to-br from-violet-300 via-violet-50 to-white ring-1 ring-white/20`
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
                className={`object-cover w-[130px] h-[110px] rounded-xl`}
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

            <div className="w-full h-[110px] flex flex-col justify-between pr-0 p-2 gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                <p className="text-black/80">
                  {title}{" "}
                  <span className="text-gray-600 text-xs">({category})</span>
                </p>

                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        onShowInfos();
                      }}
                      className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                    >
                      <TbEdit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        onShowVariant();
                      }}
                      className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                    >
                      <MdOutlineCategory size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        onOpen();
                      }}
                      className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                    >
                      <RiDeleteBin5Line size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="text-gray-600">موجودی {varientsCount}</p>
                <p className="text-gray-600">
                  {originalPrice != null ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-[18px] text-emerald-600">
                        {Number(price).toLocaleString("fa-IR")} تومان
                      </span>
                      <span className="text-sm text-gray-500 line-through decoration-2 decoration-gray-400">
                        {Number(originalPrice).toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  ) : (
                    <span>{Number(price).toLocaleString("fa-IR")} تومان</span>
                  )}
                </p>
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
