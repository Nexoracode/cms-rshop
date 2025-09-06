"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  NumberInput
} from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";
import { Stock } from "@/types";

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
  });

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
                  labelPlacement="outside"
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
                  labelPlacement="outside"
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
          {/* <Button
                color="success"
                variant="flat"
                className="w-full mt-4"
                onPress={onHandleSubmit}
              >
                ثبت تغیرات
              </Button> */}
        </CardBody>
      </Card>
    </>
  );
};

export default VariantRowEditor;
