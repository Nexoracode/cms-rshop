"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  NumberInput,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import BoxHeader from "./helpers/BoxHeader";
import { LuScrollText } from "react-icons/lu";
import BrandItem from "./BrandItem/BrandItem";
import SizeGuide from "./SizeGuide/SizeGuide";
import { SizeGuideProp } from "./SizeGuide/type";
import { BrandItemProp } from "./BrandItem/type";

type LastInfos = {
  description: string;
  is_visible: boolean;
  order_limit: number;
  helper: null | SizeGuideProp;
  brand: null | BrandItemProp;
};

interface LastAdditionalInfosProps {
  onChange: (data: any) => void;
  defaultValues?: LastInfos;
}

const LastAdditionalInfos = ({
  onChange,
  defaultValues,
}: LastAdditionalInfosProps) => {
  const [formData, setFormData] = useState<LastInfos>({
    description: "",
    is_visible: true,
    order_limit: 0,
    helper: null,
    brand: null,
    ...(defaultValues ?? {}),
  });

  const [selectItem, setSelectItem] = useState<"limit" | "unlimit">(
    defaultValues?.order_limit ? "limit" : "unlimit"
  );

  useEffect(() => {
    onChange({
      helper_id: formData?.helper?.id,
      brand_id: formData?.brand?.id,
      description: formData.description,
      is_visible: formData.is_visible,
      ...(selectItem === "limit"
        ? { order_limit: formData.order_limit || 1 }
        : {}),
    });
  }, [formData, selectItem]);

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
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <Select
          dir="rtl"
          labelPlacement="outside"
          label="وضعیت نمایش در وبسایت"
          placeholder="انتخاب وضعیت محصول"
          className="!mt-8"
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              is_visible: e.target.value ? true : false,
            }));
          }}
          selectedKeys={[formData.is_visible ? "visible" : "hidden"]}
        >
          <SelectItem key="visible">
            نمایش - در فروشگاه نمایش داده میشود
          </SelectItem>
          <SelectItem key="hidden">
            عدم نمایش - در فروشگاه نمایش داده نمی شود
          </SelectItem>
        </Select>

        <div
          className={`flex flex-col justify-between ${
            selectItem === "limit" ? "bg-stone-50 rounded-xl p-2" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4 text-gray-700">
            <p>محدودیت تعداد برای هر سفارش</p>
            <Switch
              isSelected={selectItem === "limit"}
              onValueChange={() =>
                setSelectItem((prev) =>
                  prev === "limit" ? "unlimit" : "limit"
                )
              }
              aria-label="محدودیت تعداد"
              size="sm"
            />
          </div>

          {selectItem === "limit" && (
            <NumberInput
              label="حداکثر تعداد قابل سفارش"
              placeholder="3"
              minValue={1}
              value={formData.order_limit ?? 1}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  order_limit: val,
                }))
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">عدد</span>
                </div>
              }
              labelPlacement="outside"
            />
          )}
        </div>

        <BrandItem
          onBrand={(datas) =>
            setFormData((prev) => ({ ...prev, brand: datas }))
          }
          defaultBrand={formData.brand}
        />
        <SizeGuide
          onSizeGuide={(datas) =>
            setFormData((prev) => ({ ...prev, helper: datas }))
          }
          sizeGuide={formData.helper}
        />
      </CardBody>
    </Card>
  );
};

export default LastAdditionalInfos;
