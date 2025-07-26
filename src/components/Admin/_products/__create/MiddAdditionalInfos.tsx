"use client"

import { Card, CardBody, NumberInput, Switch } from "@heroui/react"
import { useEffect, useState } from "react"
import BoxHeader from "./helpers/BoxHeader"
import { FiShoppingBag } from "react-icons/fi"

interface MiddAdditionalInfosProps {
  onChange: (data: {
    weight: number;
    weight_unit: string;
    is_same_day_shipping: boolean;
    requires_preparation: boolean;
    preparation_days: number | null;
  }) => void;
}

const MiddAdditionalInfos = ({ onChange }: MiddAdditionalInfosProps) => {
  const [selectItem, setSelectItem] = useState<"today" | "time-ready">("time-ready")

  const [weight, setWeight] = useState(1)
  const [weightUnit, setWeightUnit] = useState("کیلوگرم")
  const [preparationDays, setPreparationDays] = useState(1)

  const isPreparation = selectItem === "time-ready"
  const isSameDayShipping = selectItem === "today"

  useEffect(() => {
    onChange({
      weight,
      weight_unit: weightUnit,
      is_same_day_shipping: isSameDayShipping,
      requires_preparation: isPreparation,
      preparation_days: isPreparation ? preparationDays : 0,
    })
  }, [weight, weightUnit, isSameDayShipping, isPreparation, preparationDays])

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
          value={weight}
          onValueChange={(val) => setWeight(val)}
          labelPlacement={"outside"}
          endContent={
            <div className="flex items-center">
              <select
                aria-label="Select unit"
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
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
            <div className={`flex flex-col justify-between ${isPreparation ? "bg-stone-50 rounded-xl p-2" : ""}`}>
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <p>محصول نیاز به زمان آماده‌ سازی دارد</p>
                <Switch
                  isSelected={isPreparation}
                  onValueChange={() =>
                    setSelectItem((prev) => (prev === "time-ready" ? "today" : "time-ready"))
                  }
                  size="sm"
                />
              </div>

              {isPreparation && (
                <NumberInput
                  label="زمان آماده‌سازی"
                  placeholder="3"
                  minValue={1}
                  value={preparationDays}
                  onValueChange={(val) => setPreparationDays(val)}
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
                  برچسب “ارسال امروز” روی کارت این محصول در فروشگاه نمایش داده خواهد شد.
                </small>
              </div>
              <Switch
                isSelected={isSameDayShipping}
                onValueChange={() =>
                  setSelectItem((prev) => (prev === "time-ready" ? "today" : "time-ready"))
                }
                size="sm"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default MiddAdditionalInfos
