"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import StatusBadge from "@/components/shared/StatusBadge";
import CardRows from "@/components/shared/CardRows";

import { useDeleteCoupon } from "@/hooks/api/useCoupon";
import { TbCategory2 } from "react-icons/tb";
import { LuPercent, LuUsers } from "react-icons/lu";
import { TfiShoppingCartFull } from "react-icons/tfi";

type CouponItem = {
  id: number;
  code: string;
  type: "percent" | "fixed";
  amount: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  start_date?: string;
  end_date?: string;
  usage_limit?: number;
  for_first_order?: boolean;
  allowed_users?: any[];
  allowed_products?: any[];
  allowed_categories?: any[];
  is_active: boolean;
};

type Props = {
  item: CouponItem;
  editRoute: string;
  disableAction?: boolean;
};

const CouponCard: React.FC<Props> = ({
  item,
  editRoute,
  disableAction = false,
}) => {
  const deleteCoupon = useDeleteCoupon();

  const rowItems = [
    {
      label: "نوع تخفیف",
      value: item.type === "percent" ? "درصدی" : "مبلغ ثابت",
    },
    {
      label: "مقدار",
      value:
        item.type === "percent"
          ? `${Math.floor(item.amount)}%`
          : `${Number(item.amount).toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "حداقل مبلغ سفارش",
      value: item.min_order_amount
        ? `${Number(item.min_order_amount).toLocaleString("fa-IR")} تومان`
        : "—",
    },
    {
      label: "سقف تخفیف",
      value: item.max_discount_amount
        ? `${Number(item.max_discount_amount).toLocaleString("fa-IR")} تومان`
        : "—",
    },
    {
      label: "پایان اعتبار",
      value: item.end_date
        ? new Date(item.end_date).toLocaleDateString("fa-IR")
        : "—",
    },
  ];

  return (
    <BaseCard bodyClassName="flex flex-col gap-2 p-4" redirect={editRoute}>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-blue-500 bg-slate-50 rounded-full p-4">
            <TbCategory2 />
            <LuUsers  />
            <TfiShoppingCartFull  />
            <LuPercent  />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-primary">{item.code}</p>
            <StatusBadge isActive={item.is_active} size="sm" />
          </div>
        </div>

        {!disableAction && (
          <div className="pl-1.5">
            <DeleteButton onDelete={() => deleteCoupon.mutate(item.id)} />
          </div>
        )}
      </div>

      {/* Content */}
      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CouponCard;
