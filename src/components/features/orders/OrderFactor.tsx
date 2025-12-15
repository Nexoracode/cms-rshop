"use client";

import BaseModal from "@/components/ui/modals/BaseModal";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IoReceiptOutline } from "react-icons/io5";

type OrderFactorProps = {
  order: any;
};

const OrderFactor: React.FC<OrderFactorProps> = ({ order }) => {
  return (
    <BaseModal
      triggerProps={{
        title: "مشاهده فاکتور",
        className: "bg-[var(--color-primary)] text-white",
        icon: <GoArrowUpRight />,
        variant: "flat",
      }}
      title="فاکتور سفارش"
      confirmText="چاپ فاکتور"
      onConfirm={() => {}}
      icon={<IoReceiptOutline />}
    ></BaseModal>
  );
};

export default OrderFactor;
