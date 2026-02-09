"use client";

import { memo } from "react";
import NumberInput from "@/components/ui/inputs/NumberInput";
import DiscountedPriceInput from "@/components/forms/Inputs/DiscountedPriceInput";
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";

type Variant = {
  id: number;
  price: number;
  stock: number;
  sku: string;
  discount_amount?: number;
  discount_percent?: number;
  [k: string]: any;
};

type Props = {
  index: number;
  value: Variant;
  onChange: (index: number, patch: Partial<Variant>) => void;
  errors?: Record<string, string>;
};

const VariantRowEditor: React.FC<Props> = ({
  index,
  value,
  onChange,
  errors = {},
}) => {
  return (
    <BaseCard
      className="w-full transition-all"
      bodyClassName="flex flex-col gap-4 p-4"
    >
      <div className="cursor-auto text-center text-gray-600 mb-2 p-2.5 px-6 border rounded-xl">
        {value?.name ?? `واریانت ${index + 1}`}
      </div>

      <TextInput
        label="کد انبار"
        placeholder="مثلاً SKU12345"
        className="bg-white rounded-xl text-right"
        value={value.sku}
        onChange={(val) => onChange(index, { sku: val })}
        errorMessage={errors.sku}
        allowSpecialChars
      />

      <DiscountedPriceInput
        price={value.price}
        discount_amount={value.discount_amount ?? 0}
        discount_percent={value.discount_percent ?? 0}
        onPriceChange={(price) => onChange(index, { price: +price })}
        onDiscountChange={(type, val) =>
          onChange(
            index,
            type === "amount"
              ? { discount_amount: +val, discount_percent: 0 }
              : { discount_percent: +val, discount_amount: 0 },
          )
        }
        style="flex flex-col gap-4"
        errorMessage={errors.price}
      />

      <NumberInput
        label="موجودی"
        placeholder="مثلاً 100"
        suffix="عدد"
        min={0}
        value={value.stock}
        onChange={(stock) => onChange(index, { stock })}
      />
    </BaseCard>
  );
};

const VariantEditorCard = memo(VariantRowEditor);
export default VariantEditorCard;
