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
import { RiDeleteBinLine } from "react-icons/ri";
import MiniBoxInfo from "@/components/Helper/MiniBoxInfo";
import { PiMoneyWavy } from "react-icons/pi";
import { LuBox, LuScrollText } from "react-icons/lu";
import { CgCalendarDates } from "react-icons/cg";
import { MdOutlineCategory } from "react-icons/md";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import DynamicModal from "@/components/Helper/DynamicModal";

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
        className={`border shadow-lg relative hover:shadow-xl !transition-all ${
          selected ? "shadow-none border border-sky-500 hover:shadow-none scale-95" : ""
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
          className="relative cursor-pointer"
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

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-fit h-full">
              <img
                alt="product cover"
                className={`object-cover w-[150px] h-[150px] sm:h-[128px] rounded-xl`}
                src={pathImg}
              />
              {!isVisible ? (
                <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
                  <p className="animate-bounce">عدم نمایش</p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="w-full flex h-full flex-col gap-4 text-start">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                <p className="text-[17px] text-gray-700">
                  {title}{" "}
                  <span className="text-gray-500 text-sm">({category})</span>
                </p>

                <div className="border rounded-xl flex">
                  <Tooltip
                    closeDelay={2000}
                    color="success"
                    showArrow
                    placement="top"
                    content="ویرایش اطلاعات محصول"
                    className="text-white"
                  >
                    <Button
                      size="sm"
                      color="success"
                      variant="light"
                      className="w-full sm:w-fit"
                      onPress={(e) => {
                        onShowInfos();
                      }}
                    >
                      <LuScrollText className="text-lg" />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    closeDelay={2000}
                    color="secondary"
                    showArrow
                    placement="top"
                    content="ویرایش ویژگی های محصول"
                    className="text-white"
                  >
                    <Button
                      size="sm"
                      color="secondary"
                      variant="flat"
                      className="w-full sm:w-fit"
                      onPress={(e) => {
                        onShowVariant();
                      }}
                    >
                      <MdOutlineCategory className="text-xl" />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    closeDelay={2000}
                    color="danger"
                    showArrow
                    content="حذف محصول"
                    className="text-white"
                    placement="top"
                  >
                    <Button
                      size="sm"
                      color="danger"
                      variant="light"
                      className="w-full sm:w-fit"
                      onPress={(e) => {
                        onOpen();
                      }}
                    >
                      <RiDeleteBinLine className="text-xl" />
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <MiniBoxInfo
                  name={created_at}
                  icon={<CgCalendarDates className="text-xl" />}
                />
                <MiniBoxInfo
                  name={`موجودی ${varientsCount}`}
                  icon={<LuBox className="text-xl" />}
                />
                <MiniBoxInfo
                  style={
                    originalPrice != null
                      ? "bg-gradient-to-br from-orange-200 via-white to-purple-300"
                      : ""
                  }
                  name={
                    originalPrice != null ? (
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
                    )
                  }
                  icon={<PiMoneyWavy className="text-xl" />}
                />
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
        confirmColor="danger"
        confirmVariant="solid"
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
