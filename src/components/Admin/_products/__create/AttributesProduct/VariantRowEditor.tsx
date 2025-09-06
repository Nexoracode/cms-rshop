"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input, NumberInput } from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";
import { Stock } from "@/types";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";

type Props = {
  variantName: string;
  onHandleSubmit?: () => void;
};

const VariantRowEditor: React.FC<Props> = ({ variantName, onHandleSubmit }) => {
  const [selectItem, setSelectItem] = useState<"today" | "time-ready">(
    "time-ready"
  );
  const [formData, setFormData] = useState({
    price: 10000,
    discountValue: 0,
    discountType: "percent" as Stock,
    stock: 5,
    sku: "",
  });

  const submitChange = () => {
    const { discountType, discountValue, price, stock, sku } = formData;

    const obj = {
      price,
      sku,
      stock: +stock,
      ...(discountType === "percent"
        ? { discount_percent: discountValue }
        : { discount_amount: discountValue }),
    };

    onHandleSubmit?.();
  };

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
                  label="قیمت"
                  placeholder="10,000"
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

              {/* <NumberInput
                      label="موجودی"
                      labelPlacement="outside"
                      placeholder="1"
                      minValue={1}
                      isRequired
                      isDisabled={formData.unlimitedStock}
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
                    <Checkbox
                      isSelected={formData.unlimitedStock}
                      onValueChange={(unlimitedStock) =>
                        setFormData((prev) => ({ ...prev, unlimitedStock }))
                      }
                    >
                      <p className="text-sm">موجودی نامحدود</p>
                    </Checkbox> */}

              <div className="w-full flex flex-col gap-2">
                <NumberInput
                  className="w-full"
                  label="تخفیف"
                  placeholder="10"
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
              label="کد انبار"
              placeholder="کد را وارد نمایید"
              value={formData.sku}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sku: e.target.value }))
              }
            />
            <div className="flex items-center justify-end gap-2">
              <DoubleClickBtn
                size="sm"
                onPress={() => {}}
                textBtn="حذف"
                color="danger"
                isActiveDoubleClick
              />
              <Button
                size="sm"
                color="success"
                variant="flat"
                onPress={submitChange}
              >
                ثبت تغیرات
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default VariantRowEditor;
