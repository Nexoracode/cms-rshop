"use client";

import { useState } from "react";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import NumberWithSelect from "@/components/Shared/Inputs/NumberWithSelect";
import BackToPage from "@/components/Helper/BackToPage";
import SwitchWrapper from "@/components/Shared/SwitchWrapper";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { TbShoppingCartPlus } from "react-icons/tb";
import DiscountInput from "@/components/Shared/Inputs/DiscountInput";

type DiscountType = "percent" | "amount";

const ManualOrder = () => {
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<DiscountType>("percent");

  const onDiscountChange = (type: DiscountType, value: number) => {
    console.log("Discount changed:", type, value);
    // اینجا می‌تونی مقدار تخفیف رو به parent یا فرم اصلی منتقل کنی
  };

  return (
    <>
      <BackToPage title="بازگشت" link="/admin/orders" />
      <Card className="shadow-md mt-6">
        <BoxHeader
          title="ثبت سفارش"
          color="text-blue-700 bg-blue-700/10"
          icon={<TbShoppingCartPlus className="text-3xl" />}
        />
        <CardBody className="text-right flex flex-col gap-6">
          {/* وضعیت انتخاب شده به مشتری نمایش داده می‌شود */}
          <p className="text-gray-600 pr-2 text-[13px] mt-2">
            وضعیت انتخاب شده به مشتری نمایش داده می‌شود.
          </p>

          <SwitchWrapper
            label="تخفیف فاکتور"
            description="این مبلغ به عنوان تخفیف از مجموع فاکتور کسر می‌شود"
          >
            <DiscountInput
              value={discountValue}
              onValueChange={(val) => {
                const v = val ?? 0;
                setDiscountValue(v);
                onDiscountChange(discountType, v);
              }}
              selectedKey={discountType}
              onSelectChange={(val) => {
                const t = val as DiscountType;
                setDiscountType(t);
                onDiscountChange(t, discountValue);
              }}
            />
          </SwitchWrapper>
        </CardBody>
        <CardFooter className="w-full">
          <Button variant="flat" color="secondary" className="w-full">
            ثبت
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ManualOrder;
