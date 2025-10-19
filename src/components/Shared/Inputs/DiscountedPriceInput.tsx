"use client";

import { FC, useEffect, useState } from "react";
import { Discount } from "@/types";
import PriceInput from "@/components/Shared/Inputs/PriceInput";
import DiscountInput from "./DiscountInput";

type Props = {
  price: number;
  discount_amount: number;
  discount_percent: number;
  onPriceChange: (price: number) => void;
  onDiscountChange: (type: Discount, value: number) => void;
  style?: string;
  isActiveError?: boolean;
};

const DiscountedPriceInput: FC<Props> = ({
  price,
  discount_amount,
  discount_percent,
  onPriceChange,
  onDiscountChange,
  style,
  isActiveError = false,
}) => {
  const [discountType, setDiscount] = useState<Discount>("percent");
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (discount_amount > 0) {
      setDiscount("amount");
      setDiscountValue(discount_amount);
    } else if (discount_percent > 0) {
      setDiscount("percent");
      setDiscountValue(discount_percent);
    } else {
      setDiscount("percent");
      setDiscountValue(0);
    }
  }, [discount_amount, discount_percent]);

  const finalPrice =
    discountType === "percent"
      ? price * (1 - (discountValue || 0) / 100)
      : price - (discountValue || 0);

  return (
    <div className={!style ? "flex flex-col md:flex-row gap-4" : style}>
      <div className="w-full flex flex-col items-start">
        <PriceInput
          value={price}
          onChange={onPriceChange}
          isActiveError={isActiveError}
        />

        {price > 0 && discountValue > 0 ? (
          <p className="text-green-600 text-sm mt-2 mr-3">
            قیمت با تخفیف:{" "}
            {Math.max(0, Math.round(finalPrice)).toLocaleString("fa-IR")} تومان
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <DiscountInput
          value={discountValue}
          onValueChange={(val) => {
            const v = val ?? 0;
            setDiscountValue(v);
            onDiscountChange(discountType, v);
          }}
          selectedKey={discountType}
          onSelectChange={(val) => {
            const t = val as Discount;
            setDiscount(t);
            onDiscountChange(t, discountValue);
          }}
        />

        {(price === 0 || !price) && (
          <p className="text-gray-500 text-[12px]">
            برای تعریف تخفیف ابتدا قیمت را وارد کنید.
          </p>
        )}
      </div>
    </div>
  );
};

export default DiscountedPriceInput;
