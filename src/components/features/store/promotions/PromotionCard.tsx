"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import StatusBadge from "@/components/shared/StatusBadge";
import CardRows from "@/components/shared/CardRows";
import { LuPercent } from "react-icons/lu";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import { PromotionBase } from "./promotions-types";

type Props = {
  item: PromotionBase;
  disableAction?: boolean;
};

const PromotionCard: React.FC<Props> = ({ item, disableAction = false }) => {
  const deleteCoupon = CouponHooks.useDelete();

  const rowItems = [
    { label: "عنوان", value: item.name },
    { label: "نوع", value: "مبلغ ثابت" },
    { label: "مقدار", value: "۰ تومان" },
    {
      label: "اعتبار",
      value: `از   ${
        item.starts_at
          ? new Date(item.starts_at).toLocaleDateString("fa-IR")
          : "—"
      }   تا   ${
        item.ends_at ? new Date(item.ends_at).toLocaleDateString("fa-IR") : "—"
      }`,
    },
    {
      label: "استفاده شده",
      value: item.usage_limit
        ? `از ${item.usage_limit} تا ${item.used_count}`
        : `${item.used_count} بار استفاده شده`,
    },
  ];

  const promotionsRedirects = () => {
/*     item.conditions?.map(cond => {
      if (cond.) {
        
      }
    })
 */
    if (item.type === "coupon") {
      return `/admin/store/promotions/coupon/create?edit_id=${item.id}`;
    }
    if (item.type === "first_order") {
      return `/admin/store/promotions/first-order/create?edit_id=${item.id}`;
    }
    if (item.type === "next_order_reward") {
      return `/admin/store/promotions/next-order-reward/create?edit_id=${item.id}`;
    }
    if (item.type === "flash_deal") {
      return `/admin/store/promotions/flash-deal/create?edit_id=${item.id}`;
    }
    if (item.type === "free_shipping") {
      return `/admin/store/promotions/free-shipping/create?edit_id=${item.id}`;
    }
  };

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-2 p-4"
      redirect={promotionsRedirects()}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-gray-600 bg-slate-50 rounded-full p-4">
            <LuPercent />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-primary">{item.code}</p>
            <StatusBadge isActive={item.is_active} size="sm" />
          </div>
        </div>

        {!disableAction && (
          <div className="pl-1.5">
            <DeleteButton onDelete={() => deleteCoupon.mutate(item?.id!)} />
          </div>
        )}
      </div>

      {/* Content */}
      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default PromotionCard;
