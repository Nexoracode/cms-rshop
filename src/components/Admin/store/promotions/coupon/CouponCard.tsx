"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import StatusBadge from "@/components/shared/StatusBadge";
import CardRows from "@/components/shared/CardRows";

import { useDeleteCoupon } from "@/hooks/api/useCoupon";

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

const CouponCard: React.FC<Props> = ({ item, editRoute, disableAction = false }) => {
  const deleteCoupon = useDeleteCoupon();

  const rowItems = [
    { label: "نوع تخفیف", value: item.type === "percent" ? "درصدی" : "مبلغ ثابت" },
    { label: "مقدار", value: item.type === "percent" ? `${item.amount}%` : `${Number(item.amount).toLocaleString("fa-IR")} تومان` },
    { label: "حداقل مبلغ سفارش", value: item.min_order_amount ? `${Number(item.min_order_amount).toLocaleString("fa-IR")} تومان` : "—" },
    { label: "سقف تخفیف", value: item.max_discount_amount ? `${Number(item.max_discount_amount).toLocaleString("fa-IR")} تومان` : "—" },
    { label: "شروع اعتبار", value: item.start_date ? new Date(item.start_date).toLocaleDateString("fa-IR") : "—" },
    { label: "پایان اعتبار", value: item.end_date ? new Date(item.end_date).toLocaleDateString("fa-IR") : "—" },
    { label: "محدودیت تعداد", value: item.usage_limit ?? "—" },
    { label: "اولین سفارش", value: item.for_first_order ? "بله" : "خیر" },
    { label: "کاربران مجاز", value: item.allowed_users?.length ? `${item.allowed_users.length} نفر` : "—" },
    { label: "محصولات مجاز", value: item.allowed_products?.length ? `${item.allowed_products.length} عدد` : "—" },
    { label: "دسته‌بندی‌های مجاز", value: item.allowed_categories?.length ? `${item.allowed_categories.length} مورد` : "—" },
  ];

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-2 p-4"
      redirect={editRoute}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-bold text-primary">{item.code}</p>
        <div className="flex items-center gap-2">
          {!disableAction && (
            <div className="pl-1.5">
              <DeleteButton onDelete={() => deleteCoupon.mutate(item.id)} />
            </div>
          )}
          <StatusBadge isActive={item.is_active} size="sm" />
        </div>
      </div>

      {/* Content */}
      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CouponCard;
