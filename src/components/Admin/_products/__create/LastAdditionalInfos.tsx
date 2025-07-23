"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  NumberInput,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import SizeGuide from "./temps/SizeGuide";
import BrandItem from "./temps/BrandItem";
import BoxHeader from "./helpers/BoxHeader";
import { LuScrollText } from "react-icons/lu";

const LastAdditionalInfos = () => {
  const [selectItem, setSelectItem] = useState<"limit" | "unlimit">("unlimit");

  return (
    <Card className="w-full shadow-md">
      <BoxHeader
        title="اطلاعات تکمیلی محصول"
        color="bg-black text-white"
        icon={<LuScrollText className="text-3xl" />}
      />
      <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
        <Textarea
          placeholder="توضیحات را وارد نمایید"
          labelPlacement="outside"
          label="توضیحات"
        ></Textarea>

        <Select
          dir="rtl"
          labelPlacement={"outside"}
          label="وضعیت نمایش در وبسایت"
          placeholder="انتخاب وضعیت محصول"
          className="!mt-8"
        >
          <SelectItem>نمایش - در فروشگاه نمایش داده میشود</SelectItem>
          <SelectItem>عدم نمایش - در فروشگاه نمایش داده نمی میشود</SelectItem>
        </Select>

        <div
          className={`flex flex-col justify-between ${
            selectItem === "limit" ? "bg-stone-50 rounded-xl p-2" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4 text-gray-700">
            <p>محدودیت تعداد برای هر سفارش</p>
            <Switch
              isSelected={selectItem === "limit" ? true : false}
              onValueChange={() =>
                setSelectItem((prev) =>
                  prev === "limit" ? "unlimit" : "limit"
                )
              }
              aria-label="Automatic updates"
              size="sm"
            />
          </div>
          {selectItem === "limit" ? (
            <NumberInput
              label="حداکثر تعداد قابل سفارش"
              placeholder="3"
              minValue={1}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">عدد</span>
                </div>
              }
              labelPlacement={"outside"}
            />
          ) : (
            ""
          )}
        </div>

        <SizeGuide />
        <BrandItem />
      </CardBody>
    </Card>
  );
};

export default LastAdditionalInfos;
