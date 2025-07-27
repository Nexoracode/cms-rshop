"use client";

import React from "react";
import { Card, CardBody, Image, Button } from "@heroui/react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import MiniBoxInfo from "@/components/Helper/MiniBoxInfo";
import { PiMoneyWavy } from "react-icons/pi";
import { LuBox } from "react-icons/lu";
import { CgCalendarDates } from "react-icons/cg";

type Props = {
  title: string;
  pathImg: string;
  onShowMore: () => void;
  price: string | number;
  varientsCount: string | number;
  created_at: string;
};

const ProductBox: React.FC<Props> = ({
  created_at,
  title,
  onShowMore,
  price,
  varientsCount,
  pathImg,
}) => {
  return (
    <Card isBlurred className="border-none shadow-md">
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-fit">
            <img
              alt="productr cover"
              className="object-cover w-[150px] h-[150px] sm:h-[128px] rounded-xl"
              src={pathImg}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between w-full sm:h-32 gap-6 py-2">
            <div className="flex h-full flex-col gap-4 text-start justify-between">
              <p className="text-[17px] text-gray-700">{title}</p>
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
            <div className="flex flex-row sm:flex-col items-center justify-end gap-2">
              <Button
                variant="flat"
                size="sm"
                color="success"
                className="w-full sm:w-fit"
                onPress={onShowMore}
              >
                <FiEdit className="text-lg" />
              </Button>
              <DoubleClickBtn
                onPress={() => console.log("Delete product")}
                textBtn={<RiDeleteBinLine className="text-lg" />}
                color="danger"
                size="sm"
                className="w-full sm:w-fit"
                isActiveDoubleClick
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductBox;
