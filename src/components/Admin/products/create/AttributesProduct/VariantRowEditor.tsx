"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Input } from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { Variant } from "@/types/attributes";
import { useSearchParams } from "next/navigation";
import PriceNumberInput from "../../../../forms/Inputs/Base/NumberInput";
import PriceWithDiscountInput from "../../../../forms/Inputs/DiscountedPriceInput";

type Props = {
  variantName: string;
  onHandleSubmit?: (data: Variant) => void;
  defaultValues: Variant | null;
  /** از والد می‌آد تا با کلیک دکمه ثبت، استایل خطا روشن بشه */
  isSubmitAttempted?: boolean;
  /** هر بار اعتبارسنجی تغییر کرد، نتیجه رو به والد بفرست */
  onValidityChange?: (
    id: number,
    valid: { hasPrice: boolean; hasStock: boolean; hasSku: boolean }
  ) => void;
  /** برای اسکرول به کارت خطادار */
  cardId?: string;
};

const VariantRowEditorComponent: React.FC<Props> = ({
  variantName,
  onHandleSubmit,
  defaultValues,
  isSubmitAttempted = false,
  onValidityChange,
  cardId,
}) => {
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);

  const [formData, setFormData] = useState<Variant>(
    defaultValues ?? { id: 0, price: 10000, stock: 0, sku: "" }
  );

  useEffect(() => {
    if (defaultValues) setFormData(defaultValues);
  }, [defaultValues]);

  // ===== Validation
  const hasPrice = useMemo(() => Number(formData.price) > 0, [formData.price]);
  const hasSku = useMemo(
    () => (formData.sku ?? "").trim().length > 0,
    [formData.sku]
  );
  const hasStock = useMemo(
    () =>
      formData.stock !== null &&
      formData.stock !== undefined &&
      Number(formData.stock) >= 0,
    [formData.stock]
  );

  useEffect(() => {
    onValidityChange?.(+formData.id, { hasPrice, hasStock, hasSku });
  }, [hasPrice, hasStock, hasSku, formData.id]);

  // ===== Emit up-to-date payload to parent
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
    <Card
      id={cardId}
      data-error={isCardInvalid}
      className="w-full border shadow-md transition-all hover:scale-105"
    >
      <BoxHeader
        title={variantName}
        color="bg-purple-700/10 text-purple-700"
        textSize="text-[15px]"
        icon={<></>}
      />
      <CardBody className="flex flex-col gap-4">
        {/* قیمت + تخفیف */}
        <PriceWithDiscountInput
          price={formData.price}
          discount_amount={formData.discount_amount ?? 0}
          discount_percent={formData.discount_percent ?? 0}
          onPriceChange={(price) =>
            setFormData((prev) => ({ ...prev, price: +price }))
          }
          onDiscountChange={(type, value) =>
            setFormData((prev) => ({
              ...prev,
              discount_amount: type === "amount" ? +value : 0,
              discount_percent: type === "percent" ? +value : 0,
            }))
          }
          // اگر این پراپ رو پشتیبانی می‌کنه:
          isActiveError={isSubmitAttempted && !hasPrice}
          // در غیر این صورت می‌تونی کلاس خطا به wrapper بدی
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
          onChange={(stock) => setFormData((prev) => ({ ...prev, stock }))}
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
            setFormData((prev) => ({ ...prev, sku: e.target.value }))
          }
          onClear={() => setFormData((prev) => ({ ...prev, sku: "" }))}
          isInvalid={isSubmitAttempted && !hasSku}
          errorMessage={
            isSubmitAttempted && !hasSku ? "کد انبار الزامی است" : undefined
          }
        />
      </CardBody>
    </Card>
  );
};

const VariantRowEditor = memo(VariantRowEditorComponent);
export default VariantRowEditor;
