"use client";

import React from "react";
import { Card, CardBody, Button, useDisclosure } from "@heroui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import MiniBoxInfo from "@/components/Helper/MiniBoxInfo";
import { PiMoneyWavy } from "react-icons/pi";
import { LuBox, LuScrollText } from "react-icons/lu";
import { CgCalendarDates } from "react-icons/cg";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import { MdOutlineCategory } from "react-icons/md";
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
}) => {
  const { mutate: deleteProduct } = useDeleteProduct(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card isBlurred className="border-none shadow-[0_0_7px_lightgray]">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-fit h-full">
              <img
                alt="productr cover"
                className="object-cover w-[150px] h-[150px] sm:h-[128px] rounded-xl"
                src={pathImg}
              />
            </div>

            <div className="w-full flex h-full flex-col gap-4 text-start">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                <p className="text-[17px] text-gray-700">{title}</p>
                <div className="border rounded-xl hidden sm:flex">
                  <Button
                    size="sm"
                    color="success"
                    variant="light"
                    className="w-full sm:w-fit"
                    onPress={onShowInfos}
                  >
                    <LuScrollText className="text-lg" />
                  </Button>
                  <Button
                    size="sm"
                    color="secondary"
                    variant="flat"
                    className="w-full sm:w-fit"
                    onPress={onShowVariant}
                  >
                    <MdOutlineCategory className="text-xl" />
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    className="w-full sm:w-fit"
                    onPress={onOpen}
                  >
                    <RiDeleteBinLine className="text-xl" />
                  </Button>
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
              <div className="border rounded-xl flex sm:hidden">
                <Button
                  size="sm"
                  color="success"
                  variant="light"
                  className="w-full sm:w-fit"
                  onPress={onShowInfos}
                >
                  <LuScrollText className="text-lg" />
                </Button>
                <Button
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="w-full sm:w-fit"
                  onPress={onShowVariant}
                >
                  <MdOutlineCategory className="text-xl" />
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  className="w-full sm:w-fit"
                  onPress={onOpen}
                >
                  <RiDeleteBinLine className="text-xl" />
                </Button>
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
