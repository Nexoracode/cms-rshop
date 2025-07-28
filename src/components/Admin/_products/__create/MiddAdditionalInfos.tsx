"use client";

import { Card, CardBody, NumberInput, Switch } from "@heroui/react";
import { useEffect, useState } from "react";
import BoxHeader from "./helpers/BoxHeader";
import { FiShoppingBag } from "react-icons/fi";
import { MiddInfosType } from "../types/products";

interface MiddAdditionalInfosProps {
  onChange: (data: {
    weight: number;
    weight_unit: string;
    is_same_day_shipping: boolean;
    requires_preparation: boolean;
    preparation_days: number | null;
  }) => void;
  defaultValues?: MiddInfosType;
}

const MiddAdditionalInfos = ({
  onChange,
  defaultValues,
}: MiddAdditionalInfosProps) => {
  const [formData, setFormData] = useState<MiddInfosType>({
    weight: 1,
    weight_unit: "کیلوگرم",
    is_same_day_shipping: false,
    requires_preparation: true,
    preparation_days: 1,
    ...(defaultValues ?? {}),
  });
  const [selectItem, setSelectItem] = useState<"today" | "time-ready">(
    defaultValues?.is_same_day_shipping ? "today" : "time-ready"
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      is_same_day_shipping: selectItem === "today",
      requires_preparation: selectItem === "time-ready",
    }));
  }, [selectItem]);

  useEffect(() => {
    const { preparation_days, requires_preparation } = formData;

    const newUpdate: MiddInfosType = {
      ...formData,
      preparation_days: requires_preparation ? preparation_days : 0,
    };

    onChange(newUpdate);
  }, [formData]);

  return (
    <Card className="w-full shadow-md">
      <BoxHeader
        title="اطلاعات میانی محصول"
        color="bg-black text-white"
        icon={<FiShoppingBag className="text-3xl" />}
      />
      <CardBody dir="rtl" className="flex flex-col gap-6 text-start">
        <NumberInput
          hideStepper
          label="وزن"
          placeholder="1"
          minValue={1}
          value={formData.weight}
          onValueChange={(val) =>
            setFormData((prev) => ({ ...prev, weight: +val }))
          }
          labelPlacement={"outside"}
          endContent={
            <div className="flex items-center">
              <select
                aria-label="Select unit"
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                value={formData.weight_unit}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    weight_unit: e.target.value,
                  }))
                }
              >
                <option value="گرم">گرم</option>
                <option value="کیلوگرم">کیلوگرم</option>
              </select>
            </div>
          }
          className="justify-center"
        />

        <div>
          <p>شرایط ارسال</p>
          <div className="flex flex-col gap-6 mt-3">
            <div
              className={`flex flex-col justify-between ${
                selectItem === "time-ready" ? "bg-stone-50 rounded-xl p-2" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <p>محصول نیاز به زمان آماده‌ سازی دارد</p>
                <Switch
                  isSelected={selectItem === "time-ready"}
                  onValueChange={() =>
                    setSelectItem((prev) =>
                      prev === "time-ready" ? "today" : "time-ready"
                    )
                  }
                  size="sm"
                />
              </div>

              {selectItem === "time-ready" && (
                <NumberInput
                  label="زمان آماده‌سازی"
                  placeholder="3"
                  minValue={1}
                  value={formData.preparation_days || 1}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      preparation_days: val,
                    }))
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">روز</span>
                    </div>
                  }
                  labelPlacement={"outside"}
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col text-gray-700">
                <p>می‌خواهم محصول “ارسال امروز” داشته باشد.</p>
                <small className="text-gray-500 mt-1">
                  برچسب “ارسال امروز” روی کارت این محصول در فروشگاه نمایش داده
                  خواهد شد.
                </small>
              </div>
              <Switch
                isSelected={selectItem === "today"}
                onValueChange={() =>
                  setSelectItem((prev) =>
                    prev === "time-ready" ? "today" : "time-ready"
                  )
                }
                size="sm"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MiddAdditionalInfos;
