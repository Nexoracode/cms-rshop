"use client";

import { memo, useEffect } from "react";
import { Input } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import NumberInput from "@/components/ui/inputs/NumberInput";
import DiscountedPriceInput from "@/components/forms/Inputs/DiscountedPriceInput";
import BaseCard from "@/components/ui/BaseCard";

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
  index: number; // index در لیست والد
  value: Variant;
  onChange: (index: number, patch: Partial<Variant>) => void;
  onPushPayload?: (payload: Variant) => void; // برای جمع‌آوری تغییرات (اختیاری)
  errors?: Record<string, string>;
  isSubmitAttempted?: boolean;
  onValidityChange?: (
    id: number,
    valid: { hasPrice: boolean; hasStock: boolean; hasSku: boolean }
  ) => void;
};

const VariantRowEditor: React.FC<Props> = ({
  index,
  value,
  onChange,
  onPushPayload,
  errors = {},
  isSubmitAttempted = false,
  onValidityChange,
}) => {
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);

  // derived validity
  const hasPrice = Number(value.price) > 0;
  const hasSku = (value.sku ?? "").toString().trim().length > 0;
  const hasStock =
    value.stock !== null && value.stock !== undefined && Number(value.stock) >= 0;

  // notify parent about validity
  useEffect(() => {
    onValidityChange?.(+value.id, { hasPrice, hasStock, hasSku });
  }, [hasPrice, hasStock, hasSku, value.id, onValidityChange]);

  // whenever local value changes inform parent for payload collection (optional)
  useEffect(() => {
    const { price, stock, sku, id, discount_amount, discount_percent } = value;
    const obj: Variant = {
      product_id: page,
      id,
      price: +price,
      sku,
      stock: +stock,
      ...(discount_percent ? { discount_percent: +discount_percent } : discount_amount ? { discount_amount: +discount_amount } : {}),
    };
    onPushPayload?.(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <BaseCard className="w-full transition-all" bodyClassName="flex flex-col gap-4 p-4">
      <div className="cursor-auto text-center text-gray-600 mb-2 p-2.5 px-6 border rounded-xl">
        {value?.name ?? `واریانت ${index + 1}`}
      </div>

      <Input
        isClearable
        labelPlacement="outside"
        label="کد انبار"
        placeholder="مثلاً SKU12345"
        className="bg-white rounded-xl text-right"
        value={value.sku}
        onChange={(e) => onChange(index, { sku: e.target.value })}
        onClear={() => onChange(index, { sku: "" })}
        isInvalid={!!errors.sku && isSubmitAttempted}
        errorMessage={isSubmitAttempted ? errors.sku : ""}
      />

      <DiscountedPriceInput
        price={value.price}
        discount_amount={value.discount_amount ?? 0}
        discount_percent={value.discount_percent ?? 0}
        onPriceChange={(price) => onChange(index, { price: +price })}
        onDiscountChange={(type, val) =>
          onChange(index, type === "amount" ? { discount_amount: +val, discount_percent: 0 } : { discount_percent: +val, discount_amount: 0 })
        }
        style="flex flex-col gap-4"
        errorMessage={isSubmitAttempted ? errors.price : ""}
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
export default VariantRowEditor;
