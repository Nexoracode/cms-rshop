"use client";

import { FC, useEffect, useState } from "react";
import LabeledNumberWithUnitInput from "./LabeledNumberWithUnitInput";
import PriceNumberInput from "./PriceInput";

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
      ? price * (1 - (discountValue || 0) / 100)
      : price - (discountValue || 0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full flex flex-col items-start">
        <PriceNumberInput
          value={price}
          onChange={onPriceChange}
          label="قیمت"
          placeholder="10,000"
          suffix="تومان"
          required
          min={0}
        />

        {price > 0 && discountValue > 0 ? (
          <p className="text-green-600 text-sm mt-2 mr-3">
            قیمت با تخفیف: {Math.max(0, Math.round(finalPrice)).toLocaleString("fa-IR")} تومان
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <LabeledNumberWithUnitInput
          label="تخفیف"
          placeholder="10"
          value={discountValue}
          onValueChange={(val) => {
            const v = val ?? 0;
            setDiscountValue(v);
            onDiscountChange(discountType, v);
          }}
          selectedKey={discountType}
          onSelectChange={(val) => {
            const t = val as DiscountType;
            setDiscountType(t);
            onDiscountChange(t, discountValue);
          }}
          options={[
            { key: "percent", title: "درصد" },
            { key: "amount", title: "مبلغ ثابت" },
          ]}
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

export default PriceWithDiscountInput;
