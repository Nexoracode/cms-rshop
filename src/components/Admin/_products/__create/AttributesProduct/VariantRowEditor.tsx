"use client";

import { memo, useEffect, useState } from "react";
import { Card, CardBody, Input, NumberInput } from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";
import { Stock } from "@/types";
import { formatDiscountedPrice } from "@/utils/helpers";
import { Variant } from "@/types/attributes";
import { useSearchParams } from "next/navigation";
import PriceNumberInput from "../helpers/PriceInput";

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
        icon={<MdOutlineCategory className="text-2xl" />}
      />
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 text-right">
          <NumberInput
            hideStepper
            label="قیمت"
            min={1}
            isRequired
            labelPlacement="outside"
            endContent={
              <div className="pointer-events-none flex items-center">
                {formData.price &&
                (formData.discount_percent || formData.discount_amount) ? (
                  <p className="text-green-600 text-[13px] truncate">
                    {formatDiscountedPrice(
                      formData.price,
                      formData.discount_percent,
                      formData.discount_amount
                    )}
                  </p>
                ) : (
                  <span className="text-default-400 text-small">تومان</span>
                )}
              </div>
            }
            value={+formData.price}
            onValueChange={(price) =>
              setFormData((prev) => ({ ...prev, price }))
            }
          />
        </div>

        <NumberInput
          hideStepper
          className="w-full"
          labelPlacement="outside"
          label="تخفیف"
          minValue={0}
          value={
            discountType === "percent"
              ? formData.discount_percent
              : formData.discount_amount
          }
          endContent={
            <select
              aria-label="Select discount type"
              className="outline-none border-0 bg-transparent text-default-400 text-small"
              value={discountType}
              onChange={(e) => {
                setDiscountType(e.target.value as Stock);
                if ((e.target.value as Stock) === "percent") {
                  setFormData((prev) => ({
                    ...prev,
                    discount_amount: undefined,
                  }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    discount_percent: undefined,
                  }));
                }
              }}
            >
              <option value="percent">درصد</option>
              <option value="money">مبلغ ثابت (تومان)</option>
            </select>
          }
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              ...(discountType === "percent"
                ? { discount_percent: value }
                : { discount_amount: value }),
            }))
          }
          isDisabled={!formData.price}
        />
        
        <PriceNumberInput
          label="موجودی"
          placeholder="مثلاً 100"
          suffix="عدد"
          min={0}
          required
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
