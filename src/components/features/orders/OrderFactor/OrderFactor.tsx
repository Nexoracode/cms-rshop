"use client";

import React, { useRef } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { GoArrowUpRight } from "react-icons/go";
import { IoReceiptOutline } from "react-icons/io5";
import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { TbTruckDelivery } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import OrderInvoiceInfos from "../OrderProccess/OrderCardInfos/OrderInvoiceInfos";
import PaymentCardInfos from "../OrderProccess/OrderCardInfos/PaymentCardInfos";
import OrderHeaderCards from "./OrderHeaderCards";
import InvoiceCardInfos from "../OrderProccess/OrderCardInfos/InvoiceCardInfos/InvoiceCardInfos";

type OrderFactorProps = {
  order: any;
};

const OrderFactor: React.FC<OrderFactorProps> = ({ order }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return <></>;

  const {
    id,
    gift_wrapping_cost,
    is_gift,
    gift_message,
    user,
    address,
    customer_note,
  } = order;

  return (
    <BaseModal
      triggerProps={{
        title: "مشاهده فاکتور",
        className: "bg-[var(--color-primary)] text-white",
        icon: <GoArrowUpRight />,
        variant: "flat",
      }}
      title={`فاکتور سفارش ${id}#`}
      confirmText="چاپ فاکتور"
      onConfirm={handlePrint}
      size="5xl"
      icon={<IoReceiptOutline />}
    >
      <div ref={contentRef} className="flex flex-col gap-6 px-6 py-2 text-sm text-slate-700">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-xl mb-1">فروشگاه آرشاپ</h3>
            <div className="text-xs text-gray-500">
              فروش انواع محصولات فرهنگی و مذهبی
            </div>
          </div>

          <OrderHeaderCards order={order} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseCard
            CardHeaderProps={{
              title: "اطلاعات مشتری",
              icon: <LuUser className="text-gray-700" />,
              showIconInActionSlot: true,
            }}
          >
            <InfoRow label="شناسه کاربر" value={`#${user.id}`} />
            <InfoRow label="نام" value={user.first_name ?? "ثبت نشده"} />
            <InfoRow
              label="نام خوانوادگی"
              value={user.last_name ?? "ثبت نشده"}
            />
            <InfoRow label="شماره موبایل" value={user.phone} />
            <InfoRow label="ایمیل" value={user.email || "ثبت نشده"} />
          </BaseCard>

          <BaseCard
            CardHeaderProps={{
              title: "اطلاعات ارسال",
              icon: <TbTruckDelivery className="text-gray-700" />,
              showIconInActionSlot: true,
            }}
          >
            <InfoRow
              label="سفارش برای"
              value={
                address.is_self
                  ? "مشتری"
                  : `${address.recipient_name} (${
                      address.recipient_phone || "بدون شماره"
                    })`
              }
            />
            <InfoRow label="کد پستی" value={address.postal_code} />
            <InfoRow
              label="استان و شهر"
              value={`${address.province}، ${address.city}`}
            />
            <InfoRow
              label="آدرس"
              value={`${address.address_line} ${
                address.plaque && `، پلاک ${address.plaque}`
              } ${address.unit && `، واحد ${address.unit}`}`}
              valueStyle="w-full"
            />
            <InfoRow
              label="توضیحات"
              value={customer_note ?? "توضیحی وجود ندارد"}
              valueStyle="w-full"
            />
          </BaseCard>
        </div>

        <InvoiceCardInfos order={order} factorOnly/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PaymentCardInfos order={order} disableActiveBg />

          <BaseCard
            CardHeaderProps={{
              title: "اطلاعات فاکتور",
              icon: <IoReceiptOutline className="text-gray-700" />,
              showIconInActionSlot: true,
            }}
          >
            <OrderInvoiceInfos order={order} />
          </BaseCard>
        </div>
      </div>
    </BaseModal>
  );
};

export default OrderFactor;
