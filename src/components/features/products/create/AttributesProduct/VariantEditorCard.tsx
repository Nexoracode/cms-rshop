"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Input } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import PriceNumberInput from "../../../../ui/inputs/NumberInput";
import PriceWithDiscountInput from "../../../../forms/Inputs/DiscountedPriceInput";
import BaseCard from "@/components/ui/BaseCard";

type Variant = any;

type Props = {
  variantName: string;
  onHandleSubmit?: (data: Variant) => void;
  defaultValues: Variant | null;
  isSubmitAttempted?: boolean;
  onValidityChange?: (
    id: number,
    valid: { hasPrice: boolean; hasStock: boolean; hasSku: boolean }
  ) => void;
};

const VariantRowEditor: React.FC<Props> = ({
  variantName,
  onHandleSubmit,
  defaultValues,
  isSubmitAttempted = false,
  onValidityChange,
}) => {
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);

  const [formData, setFormData] = useState<Variant>(
    defaultValues ?? { id: 0, price: 10000, stock: 0, sku: "" }
  );

  useEffect(() => {
    if (defaultValues) setFormData(defaultValues);
  }, [defaultValues]);

  const hasPrice = useMemo(() => Number(formData.price) > 0, [formData.price]);
  const hasSku = useMemo(
    () => (formData.sku ?? "").trim().length > 0,
    [formData.sku]
  );
  const hasStock = useMemo(
    () => formData.stock !== null && Number(formData.stock) >= 0,
    [formData.stock]
  );

  useEffect(() => {
    onValidityChange?.(+formData.id, { hasPrice, hasStock, hasSku });
  }, [hasPrice, hasStock, hasSku, formData.id]);

  useEffect(() => {
    const { price, stock, sku, id, discount_amount, discount_percent } =
      formData;
    const obj = {
      product_id: page,
      id,
      price: +price,
      sku,
      stock: +stock,
      ...(discount_percent
        ? { discount_percent: +discount_percent }
        : discount_amount
        ? { discount_amount: +discount_amount }
        : {}),
    };
    onHandleSubmit?.(obj as Variant);
  }, [formData, variantName]);

  const isCardInvalid =
    isSubmitAttempted && (!hasPrice || !hasSku || !hasStock);

  return (
    <BaseCard
      className={`w-full transition-all ${
        isCardInvalid ? "border-red-400" : ""
      }`}
      bodyClassName="flex flex-col gap-4 p-4"
      selected={isCardInvalid}
    >
      <div className="text-center text-gray-600 mb-2 border-b pb-4">
        {variantName}
      </div>
      {/* قیمت + تخفیف */}
      <PriceWithDiscountInput
        price={formData.price}
        discount_amount={formData.discount_amount ?? 0}
        discount_percent={formData.discount_percent ?? 0}
        onPriceChange={(price) =>
          setFormData((prev: any) => ({ ...prev, price: +price }))
        }
        onDiscountChange={(type, value) =>
          setFormData((prev: any) => ({
            ...prev,
            discount_amount: type === "amount" ? +value : 0,
            discount_percent: type === "percent" ? +value : 0,
          }))
        }
        isActiveError={isSubmitAttempted && !hasPrice}
        style="flex flex-col gap-4"
      />

      {/* موجودی */}
      <PriceNumberInput
        label="موجودی"
        placeholder="مثلاً 100"
        suffix="عدد"
        min={0}
        isRequired={false}
        value={formData.stock}
        onChange={(stock) => setFormData((prev: any) => ({ ...prev, stock }))}
      />

      {/* کد انبار */}
      <Input
        isClearable
        isRequired
        labelPlacement="outside"
        label="کد انبار"
        className="bg-white rounded-xl text-right"
        value={formData.sku}
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, sku: e.target.value }))
        }
        onClear={() => setFormData((prev: any) => ({ ...prev, sku: "" }))}
        isInvalid={isSubmitAttempted && !hasSku}
        errorMessage={
          isSubmitAttempted && !hasSku ? "کد انبار الزامی است" : undefined
        }
      />
    </BaseCard>
  );
};

const VariantEditorCard = memo(VariantRowEditor);
export default VariantEditorCard;
