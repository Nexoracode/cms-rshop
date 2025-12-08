"use client";

import { Divider } from "@heroui/react";
import InfoRow from "@/components/shared/InfoRow";
import { OrderData } from "../order-types";
import { statusMap } from "@/core/constants/statusMap";
import { getPaymentStatusText } from "./order-constants";
import { toPersianUTC } from "@/core/utils/date";
import { formatWeight, price } from "@/core/utils/helper";
import ProductCardDetail from "./ProductCardDetail";
import BaseCard from "@/components/ui/BaseCard";
import { LuScrollText } from "react-icons/lu";
import { RiShareCircleLine } from "react-icons/ri";
import { PiGiftBold, PiMoneyWavy } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect, useState } from "react";

type OrderProcessProps = {
  order: OrderData;
  actionBox?: React.ReactNode;
};

const OrderProcess: React.FC<OrderProcessProps> = ({ order, actionBox }) => {
  const [products, setProducts] = useState<any[]>([]);

  const {
    id,
    status,
    subtotal,
    discount_total,
    total,
    created_at,
    user,
    address,
    payment,
    items,
    updated_at,
    shipping_cost,
    promotion_code,
    customer_note,
    manual_discount_applied,
    total_weight,
    gift_wrapping,
    is_gift,
    gift_message,
    gift_wrapping_cost,
    manual_discount_type,
    manual_discount_value,
    promotions_discount_type,
    promotions_discount_value,
    promotions_discount_applied
  } = order;

  const paymentMethod = payment
    ? payment.payment_method === "online"
      ? "پرداخت آنلاین (زرین‌پال)"
      : "کارت به کارت"
    : "—";

  useEffect(() => {
    if (!items) return;
    console.log(items);

    type Item = {
      id: number;
      line_total: number;
      quantity: number;
      unit_price: number;
      variant: {
        id: number;
        price: number;
        sku: string;
        attributes: { value: string }[];
      };
      product: {
        id: number;
        image: string;
        name: string;
      };
    };

    const equalItems: Item[] = [];
    const notEqualItems: Item[] = [];

    for (let index = 0; index < items.length; index++) {
      const element = items[index] as Item;

      if (items[index + 1] !== undefined) {
        if (element.product.id === items[index + 1].product.id)
          equalItems.push(element);
        else {
          equalItems.find(
            (eq) =>
              eq.product.id !== element.product.id &&
              notEqualItems.push(element)
          );
        }
      }

      if (items[index + 1] === undefined) {
        notEqualItems.push(element);
      }
    }

    const varaintsListEqual = equalItems.map((eq) => {
      const { id, line_total, unit_price, variant, quantity } = eq;
      return {
        id,
        line_total,
        unit_price,
        quantity,
        variant,
      };
    });

    const productEqual = [
      {
        product: equalItems[0].product,
        variants: varaintsListEqual,
      },
    ];

    const productNotEqual = notEqualItems.map((not) => {
      const { id, line_total, unit_price, variant, product, quantity } = not;
      return {
        product,
        variants: [
          {
            id,
            quantity,
            line_total,
            unit_price,
            variant,
          },
        ],
      };
    });

    console.log("productEqual =>", productEqual);
    console.log("productNotEqual =>", productNotEqual);
    setProducts([...productEqual, ...productNotEqual]);
  }, [items]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ستون اول */}
      <div className="space-y-6">
        <BaseCard
          CardHeaderProps={{
            title: `#${order.id}`,
            icon: (
              <p className="text-sm text-gray-700">
                {toPersianUTC(order.created_at, { showTime: false })}
              </p>
            ),
            showIconInActionSlot: true,
          }}
          bodyClassName="cursor-auto"
        >
          {actionBox}
        </BaseCard>

        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات محصولات",
            icon: <LuScrollText className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
        >
          <div className="mb-5 space-y-3">
            {products?.map((item: any, index: number) => (
              <ProductCardDetail key={index} item={item} />
            ))}
          </div>
          <InfoRow label="مجموع قیمت" value={price(subtotal)} />
          <InfoRow
            label="تخفیف دستی فاکتور"
            value={
              manual_discount_value
                ? manual_discount_type === "percent"
                  ? `${manual_discount_value}%`
                  : price(manual_discount_value)
                : "—"
            }
          />
          <InfoRow
            label="قیمت پس از کسر تخفیف دستی"
            value={
              manual_discount_applied ? price(manual_discount_applied) : "—"
            }
          />
          <InfoRow
            label="کدتخفیف"
            value={
              promotions_discount_value
                ? promotions_discount_type === "percent"
                  ? `${promotions_discount_value}%`
                  : price(promotions_discount_value)
                : "—"
            }
          />
          <InfoRow
            label="قیمت پس از کسر تخفیف پروموشن"
            value={
              promotions_discount_applied ? price(promotions_discount_applied) : "—"
            }
          />
          <InfoRow
            label="مجموع تخفیفات"
            value={discount_total ? price(discount_total) : "—"}
          />
          <InfoRow label="کد تخفیف" value={promotion_code ?? "—"} />
          <InfoRow label="هزینه ارسال" value={"—"} />
          <InfoRow
            label="هزینه بسته بندی"
            value={
              shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))
            }
          />
          <Divider className="!mt-3 mb-1" />
          <InfoRow label="مبلغ قابل پرداخت" value={price(total)} hoverable />
        </BaseCard>
      </div>

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
            valueStyle="group-hover:relative group-hover:pb-3 group-hover:text-right"
          />
          <InfoRow
            label="توضیحات"
            value={customer_note ?? "توضیحی وجود ندارد"}
            hoverable
            valueStyle="group-hover:relative group-hover:pb-3 group-hover:text-right"
            isActiveBg
          />
        </BaseCard>

        {is_gift ? (
          <BaseCard
            CardHeaderProps={{
              title: "هدیه",
              icon: <PiGiftBold className="text-gray-700" />,
              showIconInActionSlot: true,
            }}
            bodyClassName="space-y-1"
          >
            <img
              src={gift_wrapping || "/images/placeholder.png"}
              alt="عکس کاغذ کادو"
              className="w-48 mx-auto mb-4 rounded-lg hover:scale-150 transition-all duration-300 shadow-lg"
            />

            <InfoRow label="پیام هدیه" value={gift_message ?? "—"} />

            <InfoRow
              label="هزینه بسته‌بندی"
              value={gift_wrapping_cost ? price(gift_wrapping_cost) : "رایگان"}
              isActiveBg
            />
          </BaseCard>
        ) : (
          ""
        )}

        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات پرداخت",
            icon: <PiMoneyWavy className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="space-y-1"
        >
          <InfoRow
            label="وضعیت پرداخت"
            value={getPaymentStatusText(order?.payment)}
          />
          <InfoRow
            label="تاریخ پرداخت"
            value={payment?.created_at ? toPersianUTC(payment.created_at) : "—"}
            isActiveBg
          />
          <InfoRow label="روش پرداخت" value={paymentMethod} />
          <InfoRow
            label="مبلغ"
            value={payment?.amount ? price(payment?.amount) : "—"}
            isActiveBg
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
            label="تاریخ ثبت"
            value={toPersianUTC(created_at)}
            isActiveBg
          />
          <InfoRow label="وضعیت سفارش" value={statusMap[status].title} />
          <InfoRow label="آماده سازی" value={"1 روز"} isActiveBg />
        </BaseCard>

        <BaseCard
          CardHeaderProps={{
            title: "اطلاعات ارسال",
            icon: <TbTruckDelivery className="text-gray-700" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="space-y-1"
        >
          <InfoRow
            label="کد رهگیری"
            value={payment?.tracking_code || "ندارد"}
            hoverable
          />
          <InfoRow label="روش ارسال" value={"پیک فروشگاه"} isActiveBg />
          <InfoRow
            label="زمان ارسال"
            value={toPersianUTC(updated_at, { showTime: false })}
          />
          <InfoRow
            label="وزن مرسوله"
            value={formatWeight(total_weight)}
            isActiveBg
          />
        </BaseCard>
      </div>
    </div>
  );
};

export default OrderProcess;
