"use client";

import { memo, useEffect, useState } from "react";
import { Card, CardBody, Input } from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { Stock } from "@/types";
import { Variant } from "@/types/attributes";
import { useSearchParams } from "next/navigation";
import PriceNumberInput from "../helpers/PriceInput";
import PriceWithDiscountInput from "../helpers/PriceWithDiscountInput";

type Props = {
  variantName: string;
  onHandleSubmit?: (data: Variant) => void;
  defaultValues: Variant | null;
};

const VariantRowEditorComponent: React.FC<Props> = ({
  variantName,
  onHandleSubmit,
  defaultValues,
}) => {
  const [discountType, setDiscountType] = useState<Stock>("percent");
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);
  const [formData, setFormData] = useState<Variant>(
    defaultValues ?? {
      id: 0,
      price: 10000,
      stock: 0,
      sku: "",
    }
  );

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
      setDiscountType(defaultValues.discount_amount ? "money" : "percent");
    }
  }, [defaultValues]);

  useEffect(() => {
    const { price, stock, sku, id, discount_amount, discount_percent } =
      formData;

    const obj = {
      product_id: page,
      id,
      price,
      sku,
      stock: +stock,
      ...(discount_percent
        ? { discount_percent: +discount_percent }
        : discount_amount
        ? { discount_amount: +discount_amount }
        : {}),
      //attributes: (formData as any).attributes
    };

    onHandleSubmit?.(obj);
  }, [formData, variantName]);

  console.log(formData.discount_percent);

  return (
    <Card className="w-full border shadow-md transition-all hover:scale-105">
      <BoxHeader
        title={variantName}
        color="bg-purple-700/10 text-purple-700"
        textSize="text-[15px]"
        icon={<></>}
      />
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 text-right">
          <PriceWithDiscountInput
            price={formData.price}
            discount_amount={formData.discount_amount ?? 0}
            discount_percent={formData.discount_percent ?? 0}
            onPriceChange={(price) =>
              setFormData((prev) => ({ ...prev, price }))
            }
            onDiscountChange={(type, value) =>
              setFormData((prev) => ({
                ...prev,
                discount_amount: type === "amount" ? +value : 0,
                discount_percent: type === "percent" ? +value : 0,
              }))
            }
            style="flex flex-col gap-4"
          />
        </div>

        <PriceNumberInput
          label="موجودی"
          placeholder="مثلاً 100"
          suffix="عدد"
          min={0}
          isRequired
          value={formData.stock}
          onChange={(stock) => setFormData((prev) => ({ ...prev, stock }))}
        />

        <Input
          isClearable
          isRequired
          labelPlacement="outside"
          label="کد انبار"
          className="bg-white rounded-xl"
          value={formData.sku}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sku: e.target.value }))
          }
          onClear={() => setFormData((prev) => ({ ...prev, sku: "" }))}
        />
      </CardBody>
    </Card>
  );
};

const VariantRowEditor = memo(VariantRowEditorComponent);

export default VariantRowEditor;
