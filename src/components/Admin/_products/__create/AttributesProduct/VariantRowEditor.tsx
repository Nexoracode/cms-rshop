"use client";

import { memo, useEffect, useState } from "react";
import { Card, CardBody, Input, NumberInput } from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";
import { Stock } from "@/types";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { formatDiscountedPrice } from "@/utils/helpers";
import { Variant } from "@/types/attributes";

type Props = {
  variantName: string;
  onHandleSubmit?: (data: Variant) => void;
  onRemove: (id: string | number) => void;
  defaultValues: Variant | null;
};

const VariantRowEditorComponent: React.FC<Props> = ({
  variantName,
  onHandleSubmit,
  onRemove,
  defaultValues,
}) => {
  const [discountType, setDiscountType] = useState<Stock>("percent");
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
      id,
      price,
      sku,
      stock: +stock,
      ...(discount_percent
        ? { discount_percent: +discount_percent }
        : discount_amount
        ? { discount_amount: +discount_amount }
        : {}),
    };

    onHandleSubmit?.(obj);
  }, [formData, variantName]);

  return (
    <>
      <Card className={`shadow-md shadow-purple-300`}>
        <BoxHeader
          title={variantName}
          color="bg-purple-700/10 text-purple-700"
          icon={<MdOutlineCategory className="text-3xl" />}
        />
        <CardBody className="shadow-md flex flex-col gap-6">
          <div className="flex flex-col gap-6 text-right">
            <div className="flex items-center gap-4">
              <div className="w-full flex flex-col items-start">
                <NumberInput
                  size="sm"
                  placeholder="قیمت را وارد نمایید"
                  min={1}
                  isRequired
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">تومان</span>
                    </div>
                  }
                  value={+formData.price}
                  onValueChange={(price) =>
                    setFormData((prev) => ({ ...prev, price }))
                  }
                />

                {formData.price ? (
                  <p className="text-green-600 text-sm mt-2 mr-3">
                    {formatDiscountedPrice(
                      formData.price,
                      formData.discount_percent,
                      formData.discount_amount
                    )}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <NumberInput
                size="sm"
                placeholder="موجودی را وارد کنید"
                minValue={0}
                isRequired
                //isDisabled={formData.unlimitedStock}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small truncate">
                      عدد موجود
                    </span>
                  </div>
                }
                value={+formData.stock}
                onValueChange={(stock) =>
                  setFormData((prev) => ({ ...prev, stock }))
                }
              />

              <div className="w-full flex flex-col gap-2">
                <NumberInput
                  size="sm"
                  className="w-full"
                  placeholder="تخفیف"
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
                {!formData.price && (
                  <p className="text-gray-500 text-[13px]">
                    برای تعریف تخفیف ابتدا قیمت را وارد کنید.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              isClearable
              className="bg-white rounded-xl"
              placeholder="کد انبار را وارد نمایید"
              value={formData.sku}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sku: e.target.value }))
              }
            />
            <div className="flex items-center justify-end">
              <DoubleClickBtn
                size="sm"
                onPress={() => onRemove(formData.id)}
                textBtn="حذف"
                color="danger"
                isActiveDoubleClick
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

const VariantRowEditor = memo(VariantRowEditorComponent);

export default VariantRowEditor;
