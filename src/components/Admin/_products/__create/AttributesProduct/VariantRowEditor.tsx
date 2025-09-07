"use client";

import { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  NumberInput,
} from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";
import { Stock } from "@/types";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";

type Props = {
  variantName: string;
  onHandleSubmit?: (data: Record<string, any>) => void;
  onRemove: (id: string) => void;
};

const VariantRowEditorComponent: React.FC<Props> = ({
  variantName,
  onHandleSubmit,
  onRemove,
}) => {
  const [formData, setFormData] = useState({
    price: 10000,
    discountValue: 0,
    discountType: "percent" as Stock,
    stock: 5,
    sku: "",
  });

  useEffect(() => {
    const { discountType, discountValue, price, stock, sku } = formData;

    const obj = {
      id: variantName,
      price,
      sku,
      stock: +stock,
      ...(discountType === "percent"
        ? { discount_percent: discountValue }
        : { discount_amount: discountValue }),
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
                {formData.price && formData.discountValue !== 0 && (
                  <p className="text-green-600 text-sm mt-2 mr-3">
                    قیمت با تخفیف:{" "}
                    {formData.discountType === "percent"
                      ? (
                          +formData.price *
                          (1 - formData.discountValue / 100)
                        ).toLocaleString()
                      : (
                          +formData.price - formData.discountValue
                        ).toLocaleString()}{" "}
                    تومان
                  </p>
                )}
              </div>

              <NumberInput
                size="sm"
                placeholder="موجودی را وارد کنید"
                minValue={1}
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

              {/* <Checkbox
                //isSelected={formData.unlimitedStock}
                onValueChange={(unlimitedStock) =>
                  setFormData((prev) => ({ ...prev, unlimitedStock }))
                }
              >
                <p className="text-sm">موجودی نامحدود</p>
              </Checkbox> */}

              <div className="w-full flex flex-col gap-2">
                <NumberInput
                  size="sm"
                  className="w-full"
                  placeholder="تخفیف"
                  minValue={1}
                  endContent={
                    <select
                      aria-label="Select discount type"
                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                      value={formData.discountType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: e.target.value as Stock,
                        }))
                      }
                    >
                      <option value="percent">درصد</option>
                      <option value="money">مبلغ ثابت (تومان)</option>
                    </select>
                  }
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      discountValue: value,
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
                onPress={() => onRemove(variantName)}
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
