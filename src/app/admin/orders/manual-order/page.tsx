"use client";

import { useState } from "react";
import BoxHeader from "@/components/admin/products/create/helpers/BoxHeader";
import BackToPage from "@/components/widgets/BackToPage";
import SwitchWrapper from "@/components/ui/SwitchWrapper";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { TbShoppingCartPlus } from "react-icons/tb";
import DiscountInput from "@/components/forms/Inputs/DiscountInput";
import { Discount } from "@/components/media/types";

const ManualOrder = () => {
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<Discount>("percent");

  const onDiscountChange = (type: Discount, value: number) => {
    console.log("Discount changed:", type, value);
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
                const t = val as Discount;
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
