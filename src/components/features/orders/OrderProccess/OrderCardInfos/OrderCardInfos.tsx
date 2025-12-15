"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { statusMap } from "@/core/constants/statusMap";
import { toPersianUTC } from "@/core/utils/date";
import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

type OrderCardInfosProps = {
  order: any;
};

const OrderCardInfos: React.FC<OrderCardInfosProps> = ({ order }) => {
  const { id, created_at, status, preparation_days } = order;

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات سفارش",
        icon: <HiOutlineDocumentText className="text-gray-700" />,
        showIconInActionSlot: true,
      }}
      bodyClassName="space-y-1"
    >
      <InfoRow label="کد سفارش" value={`#${id}`} hoverable />
      <InfoRow label="تاریخ ثبت" value={toPersianUTC(created_at)} isActiveBg />
      <InfoRow label="وضعیت سفارش" value={(statusMap as any)[status].title} />
      <InfoRow label="آماده سازی" value={`${preparation_days} روز`} isActiveBg />
    </BaseCard>
  );
};

export default OrderCardInfos;
