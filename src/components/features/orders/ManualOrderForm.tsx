"use client";

import { useEffect, useState } from "react";
import SwitchWrapper from "@/components/shared/SwitchWrapper";
import DiscountInput from "@/components/forms/Inputs/DiscountInput";
import { Discount } from "@/core/types";
import BaseCard from "@/components/ui/BaseCard";
import { HiOutlineDocumentText } from "react-icons/hi2";
import FormActionButtons from "@/components/common/FormActionButtons";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import SelectableProductsBox from "@/components/features/products/SelectableProduct/SelectableProductsBox";
import SelectableProductsBoxWithQuantity from "../products/SelectableProduct/SelectableProductsBoxWithQuantity";

type ManualOrderData = {
  users: any[];
  products: any[];
};

const ManualOrderForm = () => {
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<Discount>("percent");

  const [formData, setFormData] = useState<ManualOrderData>({
    users: [],
    products: [],
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onDiscountChange = (type: Discount, value: number) => {
    console.log("Discount changed:", type, value);
  };

  return (
    <BaseCard
      className="shadow-md mt-6"
      CardHeaderProps={{
        title: "ایجاد سفارش دستی",
        icon: <HiOutlineDocumentText />,
        showIconInActionSlot: true,
      }}
      wrapperContents
    >
      <SelectableUsersBox
        onChange={(selectedUsers) =>
          setFormData((prev) => ({ ...prev, users: selectedUsers }))
        }
      />

      <SelectableProductsBoxWithQuantity
        onChange={(selectedProducts) => {
          console.log(selectedProducts);
          setFormData((prev) => ({ ...prev, products: selectedProducts }));
        }}
      />

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

      <FormActionButtons cancelHref="/admin/orders" onSubmit={() => {}} />
    </BaseCard>
  );
};

export default ManualOrderForm;
