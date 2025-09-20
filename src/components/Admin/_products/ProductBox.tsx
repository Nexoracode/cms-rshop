"use client";

import React, { useState } from "react";
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
  price: string | number;
  varientsCount: string | number;
  created_at: string;
  onSelect?: (id: number, selected: boolean) => void; // ارسال به parent
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
}) => {
  const { mutate: deleteProduct } = useDeleteProduct(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

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
        className={`border-none shadow-[0_0_7px_lightgray] relative ${
          selected ? "bg-slate-50" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardBody
          onClick={toggleSelected} // کلیک روی بدنه -> select
          className="relative cursor-pointer"
        >
          {/* Checkbox */}
          <div className="absolute bg-black pr-3 pl-1 py-2 rounded-xl z-10">
            {(hovered || selected) && (
              <Checkbox
                isSelected={selected}
                onValueChange={(newValue) => {
                  setSelected(newValue);
                  onSelect?.(id, newValue);
                }}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-fit h-full">
              <img
                alt="product cover"
                className="object-cover w-[150px] h-[150px] sm:h-[128px] rounded-xl"
                src={pathImg}
              />
            </div>

            <div className="w-full flex h-full flex-col gap-4 text-start">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                <p className="text-[17px] text-gray-700">{title}</p>

                <div className="border rounded-xl flex">
                  <Tooltip
                    closeDelay={2000}
                    color="success"
                    showArrow
                    placement="right-start"
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
                    placement="bottom"
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
                  name={`موجودی ${varientsCount} عدد`}
                  icon={<LuBox className="text-xl" />}
                />
                <MiniBoxInfo
                  name={`${Number(price).toLocaleString("fa-IR")} تومان`}
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
