"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { toPersianUTC } from "@/core/utils/date";
import { PiMoneyWavy } from "react-icons/pi";
import { price } from "@/core/utils/helper";
import React from "react";
import { statusMap } from "@/core/constants/statusMap";

type PaymentCardProps = {
  order: any;
};

const PaymentCardInfos: React.FC<PaymentCardProps> = ({ order }) => {
  const { payment, status } = order;

  const paymentMethod = payment
    ? payment.payment_method === "online"
      ? "پرداخت آنلاین (زرین‌پال)"
      : "کارت به کارت"
    : "—";

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات پرداخت",
        icon: <PiMoneyWavy className="text-gray-700" />,
        showIconInActionSlot: true,
      }}
      bodyClassName="space-y-1"
    >
      <InfoRow
        label="تاریخ پرداخت"
        value={payment?.created_at ? toPersianUTC(payment.created_at) : "—"}

      />
      <InfoRow label="روش پرداخت" value={paymentMethod} isActiveBg/>
      <InfoRow
        label="مبلغ"
        value={payment?.amount ? price(payment?.amount) : "—"}
      />
    </BaseCard>
  );
};

export default PaymentCardInfos;
