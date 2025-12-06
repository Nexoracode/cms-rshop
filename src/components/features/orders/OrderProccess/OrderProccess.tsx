"use client";

import { Divider } from "@heroui/react";
import InfoRow from "@/components/shared/InfoRow";
import { OrderData } from "../order-types";
import { statusMap } from "@/core/constants/statusMap";
import { getPaymentStatusText } from "./order-constants";
import { toPersianDate } from "@/core/utils/date";
import { price } from "@/core/utils/helper";
import ProductCardDetail from "./ProductCardDetail";
import BaseCard from "@/components/ui/BaseCard";
import { LuScrollText } from "react-icons/lu";
import { RiShareCircleLine } from "react-icons/ri";
import { PiMoneyWavy } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";

type OrderProcessProps = {
  order: OrderData;
  actionBox?: React.ReactNode;
};

const OrderProcess: React.FC<OrderProcessProps> = ({ order, actionBox }) => {
  const {
    id,
    status,
    subtotal,
    discount_total,
    total,
    coupon_code,
    created_at,
    user,
    address,
    payment,
    items,
  } = order;

  const invoice = {
    total: price(subtotal),
    discount: discount_total
      ? `${Number(discount_total).toLocaleString("fa-IR")} تومان`
      : "۰ تومان",
    code: coupon_code ?? "ندارد",
    shippingCost: "رایگان",
    packagingCost: "۰ تومان",
    totalDue: price(total, false), // بدون "تومان" اگر نمی‌خوای تکرار بشه
  };

  const paymentMethod = payment
    ? payment.payment_method === "online"
      ? "پرداخت آنلاین (زرین‌پال)"
      : "کارت به کارت"
    : "-";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 !mt-6">
      {/* ستون اول */}
      <div className="space-y-6">
        <BaseCard>{actionBox}</BaseCard>

        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات محصولات",
            icon: <LuScrollText className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="space-y-1"
        >
          <div className="mb-5 space-y-3">
            {items?.map((item: any) => (
              <ProductCardDetail key={item.id} item={item} />
            ))}
          </div>

          <InfoRow label="جمع کل محصولات" value={invoice.total} isActiveBg />
          <InfoRow label="تخفیف محصولات" value={invoice.discount} />
          <InfoRow label="کد تخفیف" value={invoice.code} isActiveBg hoverable />
          <InfoRow label="هزینه ارسال" value={invoice.shippingCost} />
          <InfoRow
            label="هزینه بسته‌بندی"
            value={invoice.packagingCost}
            isActiveBg
          />
          <Divider className="!mt-4" />
          <InfoRow
            label="مبلغ قابل پرداخت"
            value={invoice.totalDue}
            hoverable
          />
        </BaseCard>
      </div>

      {/* ستون دوم */}
      <div className="space-y-6">
        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات گیرنده",
            icon: <RiShareCircleLine className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="space-y-1"
        >
          <InfoRow
            label="نام و نام خانوادگی"
            value={`${user.first_name} ${user.last_name}`}
            hoverable
          />
          <InfoRow
            label="شماره موبایل"
            value={user.phone}
            isActiveBg
            hoverable
          />
          <InfoRow label="ایمیل" value={user.email || "ثبت نشده"} hoverable />

          <InfoRow
            label="سفارش برای"
            value={
              address.is_self
                ? "خودم"
                : `${address.recipient_name} (${
                    address.recipient_phone || "بدون شماره"
                  })`
            }
            isActiveBg
            hoverable
          />

          <InfoRow label="کد پستی" value={address.postal_code} hoverable />

          <InfoRow
            label="استان و شهر"
            value={`${address.province}، ${address.city}`}
            isActiveBg
            hoverable
          />
          <InfoRow
            label="آدرس"
            value={`${address.address_line} ${
              address.plaque && `، پلاک ${address.plaque}`
            } ${address.unit && `، واحد ${address.unit}`}`}
            hoverable
            valueStyle="group-hover:group-hover:pr-6 group-hover:text-right"
          />
        </BaseCard>

        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات سفارش",
            icon: <HiOutlineDocumentText className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="space-y-1"
        >
          <InfoRow label="کد سفارش" value={`#${id}`} hoverable />
          <InfoRow
            label="تاریخ و ساعت ثبت"
            value={toPersianDate(created_at)}
            isActiveBg
          />
          <InfoRow label="وضعیت سفارش" value={statusMap[status].title} />
        </BaseCard>

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
            value={
              payment?.created_at
                ? toPersianDate(payment.created_at)
                : "پرداخت نشده"
            }
          />
          <InfoRow label="روش پرداخت" value={paymentMethod} isActiveBg />
          <InfoRow
            label="وضعیت پرداخت"
            value={getPaymentStatusText(order?.payment)}
          />
        </BaseCard>

        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات ارسال",
            icon: <TbTruckDelivery className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="space-y-1"
        >
          <div className="text-sm text-gray-500 text-center">
            <p>هنوز ارسال نشده است.</p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default OrderProcess;
