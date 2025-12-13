"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { statusMap } from "@/core/constants/statusMap";
import { toPersianUTC } from "@/core/utils/date";
import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

type OrderBoxInfosProps = {
  order: any;
};

const OrderBoxInfos: React.FC<OrderBoxInfosProps> = ({ order }) => {
  const { id, created_at, status } = order;

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
      <InfoRow label="آماده سازی" value={"1 روز"} isActiveBg />
    </BaseCard>
  );
};

export default OrderBoxInfos;
