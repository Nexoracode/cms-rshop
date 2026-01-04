"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { toPersianUTC } from "@/core/utils/date";
import { PiMoneyWavy } from "react-icons/pi";
import { price } from "@/core/utils/helper";
import React from "react";
import { getPaymentStatusText } from "../const/order-constants";

type PaymentCardProps = {
  order: any;
};

const PaymentCardInfos: React.FC<PaymentCardProps> = ({ order }) => {
  const { payment } = order;

  const getGatewayName = (gateway: string) => {
    const gatewayNames: Record<string, string> = {
      zarinpal: "زرین‌پال",
      sadad: "بانک سامان",
      mellat: "بانک ملت",
      parshee: "پارشی",
    };
    return gatewayNames[gateway] || gateway;
  };

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات پرداخت",
        icon: <PiMoneyWavy className="text-gray-700" />,
        showIconInActionSlot: true,
      }}
    >
      {/* کد رهگیری */}
      <InfoRow
        label="کد رهگیری"
        value={payment?.tracking_code ? `#${payment.tracking_code}` : "—"}
        hoverable
      />

      {/* مبلغ */}
      <InfoRow
        label="مبلغ پرداخت"
        value={payment?.amount ? price(payment.amount) : "—"}
        isActiveBg
      />

      {/* روش پرداخت */}
      <InfoRow
        label="روش پرداخت"
        value={payment?.payment_method === "online" ? "آنلاین" : "کارت به کارت"}
      />

      {/* درگاه پرداخت */}
      <InfoRow
        label="درگاه پرداخت"
        value={payment?.gateway ? getGatewayName(payment.gateway) : "—"}
        isActiveBg
      />

      {/* تاریخ واریز */}
      <InfoRow
        label="تاریخ واریز"
        value={payment?.deposit_date ? toPersianUTC(payment.deposit_date) : "—"}
      />
      
      <InfoRow
        label="وضعیت پرداخت"
        value={getPaymentStatusText(payment?.status)}
        isActiveBg
      />

      {/* شماره کارت فرستنده */}
      {payment?.payment_method === "card_to_card" && (
        <InfoRow
          label="شماره کارت فرستنده"
          value={payment?.sender_card_number || "—"}
        />
      )}

      {/* یادداشت ادمین */}
      {payment?.admin_note && (
        <InfoRow label="یادداشت ادمین" value={payment.admin_note} isActiveBg/>
      )}
    </BaseCard>
  );
};

export default PaymentCardInfos;
