"use client";

import BoxHeader from "@/components/admin/products/create/helpers/BoxHeader";
import BackToPage from "@/components/shared/BackToPage";
import {
  Button,
  Card,
  CardBody,
  DateRangePicker,
  Divider,
  Input,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { PiMapPinAreaBold } from "react-icons/pi";

const FreeShipping = () => {
  const [selectedArea, setSelectedArea] = useState<
    "nationwide" | "coveredArea"
  >("nationwide");
  const [selectedMethod, setSelectedMethod] = useState<
    "unlimit" | "minimum" | "count"
  >("unlimit");

  const province = [
    { key: "south", label: "خراسان جنوبی" },
    { key: "north", label: "خراسان شمالی" },
    { key: "middle", label: "خراسان رضوی" },
  ];

  const city = [
    { key: "south", label: "یزد" },
    { key: "north", label: "بیرجند" },
    { key: "middle", label: "مشهد" },
  ];

  useEffect(() => {
    console.log(selectedArea);
  }, [selectedArea]);

  return (
    <>
      <BackToPage title="تخفیف ها" link="/admin/store/promotions" />
      <Card className="shadow-md mt-6">
        <BoxHeader
          title="اطلاعات ارسال رایگان"
          color="bg-blue-700/10 text-blue-700"
          icon={<PiMapPinAreaBold className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-6 text-right">
          <div className="flex flex-col gap-4">
            <Input
              isRequired
              label="موضوع"
              labelPlacement="outside"
              name="title"
              placeholder="موضوع مورد نظر خود را وارد کنید"
            />
            <small className="text-gray-600">
              مشتریان شما، موضوع این تخفیف را در سبد خرید و صورتحساب خود
              می‌بینند.
            </small>
          </div>
          <Divider />
          <div>
            <RadioGroup
              isRequired
              label="محدوده اعمال تخفیف"
              value={selectedArea}
              onValueChange={(val) => setSelectedArea(val as any)}
            >
              <Radio value="nationwide">سراسر کشور</Radio>
              <Radio value="coveredArea">استان و شهر تحت پوشش</Radio>
            </RadioGroup>
            {selectedArea === "coveredArea" ? (
              <div className="flex flex-col gap-4 bg-slate-50 rounded-2xl p-4">
                <Select label="استان خود را انتخاب کنید">
                  {province.map((province) => (
                    <SelectItem key={province.key}>{province.label}</SelectItem>
                  ))}
                </Select>
                <Select label="شهر خود را انتخاب کنید">
                  {city.map((city) => (
                    <SelectItem key={city.key}>{city.label}</SelectItem>
                  ))}
                </Select>
              </div>
            ) : (
              ""
            )}
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <RadioGroup
              isRequired
              label="نحوه اعمال تخفیف"
              value={selectedMethod}
              onValueChange={(val) => setSelectedMethod(val as any)}
            >
              <Radio value="unlimit">بدون محدودیت</Radio>
              <Radio value="minimum">
                حداقل مبلغ سبد خرید برای استفاده از تخفیف
              </Radio>
              <Radio value="count">تعداد محصولات سبد خرید</Radio>
            </RadioGroup>
            {selectedMethod === "minimum" ? (
              <NumberInput
                labelPlacement={"outside"}
                placeholder="مبلغ را وارد کنید"
                minValue={1}
                endContent={<p>تومان</p>}
                onValueChange={(value: any) => {}}
              />
            ) : selectedMethod === "count" ? (
              <NumberInput
                labelPlacement={"outside"}
                placeholder="عدد را وارد کنید"
                minValue={1}
                endContent={<p>عدد</p>}
                onValueChange={(value: any) => {}}
              />
            ) : (
              ""
            )}
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <DateRangePicker
              label="زمان فعال بودن تخفیف"
              labelPlacement="outside"
            />
          </div>

          <div className="w-full text-end">
            <Button color="secondary" variant="flat">
              تایید اطلاعات
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default FreeShipping;
