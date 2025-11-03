"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import StatusBadge from "@/components/shared/StatusBadge";
import CardRows from "@/components/shared/CardRows";
import { GiPartyPopper } from "react-icons/gi";

import { useDeleteCoupon } from "@/core/hooks/api/useCoupon";
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
  disableAction?: boolean;
};

const CouponCard: React.FC<Props> = ({ item, disableAction = false }) => {
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
    <BaseCard
      bodyClassName="flex flex-col gap-2 p-4"
      redirect={
        (item?.allowed_categories?.length &&
          `/admin/store/promotions/coupon/categories?edit_id=${item.id}`) ||
        (item?.allowed_products?.length &&
          `/admin/store/promotions/coupon/products?edit_id=${item.id}`) ||
        (item?.allowed_users?.length &&
          `/admin/store/promotions/coupon/users?edit_id=${item.id}`) ||
        `/admin/store/promotions/coupon/create?edit_id=${item.id}`
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-gray-600 bg-slate-50 rounded-full p-4">
            {item?.allowed_users?.length ? <LuUsers /> : ""}
            {item?.allowed_products?.length ? <TfiShoppingCartFull /> : ""}
            {item?.allowed_categories?.length ? <TbCategory2 /> : ""}
            {!item?.allowed_categories?.length &&
            !item?.allowed_users?.length &&
            !item?.allowed_products?.length ? (
              <LuPercent />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-primary">{item.code}</p>
            <StatusBadge isActive={item.is_active} size="sm" />
          </div>
        </div>

        {!disableAction && (
          <div className="flex items-center gap-2">
            {item.for_first_order ? (
              <div className="border-l pl-2 ml-1">
                <div className="bg-gray-100 rounded-lg p-1">
                  <GiPartyPopper className="text-2xl text-orange-600 animate-bounce" />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="pl-1.5">
              <DeleteButton onDelete={() => deleteCoupon.mutate(item.id)} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CouponCard;
