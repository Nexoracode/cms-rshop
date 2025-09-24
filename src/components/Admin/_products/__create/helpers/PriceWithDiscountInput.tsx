"use client";

import { FC, useEffect, useState } from "react";
import { NumberInput } from "@heroui/react";
import LabeledNumberWithUnitInput from "./LabeledNumberWithUnitInput";

type DiscountType = "percent" | "amount";

type Props = {
  price: number;
  discount_amount: number;
  discount_percent: number;
  onPriceChange: (price: number) => void;
  onDiscountChange: (type: DiscountType, value: number) => void;
};

const PriceWithDiscountInput: FC<Props> = ({
  price,
  discount_amount,
  discount_percent,
  onPriceChange,
  onDiscountChange,
}) => {
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [discountValue, setDiscountValue] = useState(0);

  discountType === "amount" ? discount_amount : discount_percent;

  useEffect(() => {
    if (discount_amount > 0) {
      setDiscountType("amount");
      setDiscountValue(discount_amount);
    } else if (discount_percent > 0) {
      setDiscountType("percent");
      setDiscountValue(discount_percent);
    } else {
      setDiscountType("percent");
      setDiscountValue(0);
    }
  }, [discount_amount, discount_percent]);

  const finalPrice =
    discountType === "percent"
      ? price * (1 - discountValue / 100)
      : price - discountValue;

  return (
    <div className="flex gap-4">
      <div className="w-full flex flex-col items-start">
        <NumberInput
          hideStepper
          label="قیمت"
          labelPlacement="outside"
          placeholder="10,000"
          min={0}
          isRequired
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">تومان</span>
            </div>
          }
          value={+price}
          onValueChange={(val) => onPriceChange(+val)}
        />

        {price && discountValue !== 0 ? (
          <p className="text-green-600 text-sm mt-2 mr-3">
            قیمت با تخفیف: {Math.max(0, finalPrice).toLocaleString()} تومان
          </p>
        ) : (
          ""
        )}
      </div>

      <LabeledNumberWithUnitInput
        label="تخفیف"
        placeholder="10"
        value={discountValue}
        onValueChange={(val) => {
          setDiscountValue(val ?? 0);
          onDiscountChange(discountType, val ?? 0);
        }}
        selectedKey={discountType}
        onSelectChange={(val) => {
          setDiscountType(val as DiscountType);
          onDiscountChange(val as DiscountType, discountValue);
        }}
        options={[
          { key: "percent", title: "درصد" },
          { key: "amount", title: "مبلغ ثابت" },
        ]}
        style="w-full"
      />

      {!price && (
        <p className="text-gray-500 text-[13px]">
          برای تعریف تخفیف ابتدا قیمت را وارد کنید.
        </p>
      )}
    </div>
  );
};

export default PriceWithDiscountInput;
