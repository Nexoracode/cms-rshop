"use client";

import React, { useRef } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { GoArrowUpRight } from "react-icons/go";
import { IoReceiptOutline } from "react-icons/io5";
import { statusMap } from "@/core/constants/statusMap";
import { StatusOrder } from "../order-types";
import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { RiShareCircleLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import GiftWrappingCardInfos from "../OrderProccess/OrderCardInfos/GiftWrappingCardInfos/GiftWrappingCardInfos";

type OrderFactorProps = {
  order: any;
};

const fmt = (n?: number | string) => {
  const v = Number(n) || 0;
  // نمایش با ارقام فارسی و جداکننده هزارگان
  return new Intl.NumberFormat("fa-IR").format(Math.round(v)) + " تومان";
};

const fmtPlainNumber = (n?: number | string) => {
  const v = Number(n) || 0;
  return new Intl.NumberFormat("fa-IR").format(Math.round(v));
};

const fmtDateTime = (iso?: string) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString("fa-IR");
  } catch {
    return iso;
  }
};

const maskCard = (card?: string | null) => {
  if (!card) return "-";
  const clean = String(card).replace(/\s+/g, "");
  const last4 = clean.slice(-4);
  return "**** **** **** " + last4;
};

const renderAttributes = (variant: any) => {
  if (!variant?.attributes?.length) return null;
  return variant.attributes
    .map((a: any) => `${a.name}: ${a.value}`)
    .join(" • ");
};

const OrderFactor: React.FC<OrderFactorProps> = ({ order }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    // ساده و قابل‌اعتماد: چاپ کل صفحه — پروژه‌های بزرگ‌تر می‌توانند iframe یا window.print برای بخشی از صفحه پیاده کنند
    window.print();
  };

  if (!order) return null;

  const {
    id,
    created_at,
    subtotal,
    discount_total,
    total,
    shipping_cost,
    gift_wrapping_cost,
    discount_breakdown,
    promotions,
    is_gift,
    gift_message,
    user,
    address,
    items,
    payment,
    customer_note,
  } = order;

  // اگر discount_breakdown خلاصه وجود دارد از آن استفاده می‌کنیم
  const manualDiscount =
    order.manual_discount_applied ||
    discount_breakdown?.manual_discount?.total ||
    0;
  const productDiscounts =
    discount_breakdown?.product_discounts?.total ||
    discount_breakdown?.summary?.total_product_discounts ||
    0;
  const promotionDiscounts =
    discount_breakdown?.promotion_discounts?.total ||
    discount_breakdown?.summary?.total_promotion_discounts ||
    0;
  const grandTotalDiscount =
    discount_total || discount_breakdown?.summary?.grand_total_discount || 0;
  //
  const status = order.status as StatusOrder;
  const statusInfo = statusMap[status];
  console.log("Order =>", order);

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
      size="full"
      icon={<IoReceiptOutline />}
    >
      <div ref={contentRef} className="px-6 py-4 text-sm text-slate-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">فروشگاه آرشاپ</h3>
            <div className="text-xs text-gray-500">
              فروش انواع محصولات فرهنگی و مذهبی
            </div>
          </div>

          <div className="flex gap-6 text-xs">
            <div>
              <div className="text-gray-500">تاریخ</div>
              <div className="font-medium">{fmtDateTime(created_at)}</div>
            </div>
            <div>
              <div className="text-gray-500">شماره سفارش</div>
              <div className="font-medium">#{id}</div>
            </div>
            <div>
              <div className="text-gray-500">وضعیت</div>
              <div className="font-medium">{statusInfo.title}</div>
            </div>
          </div>
        </div>

        {/* گیرنده و مشتری */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <BaseCard
            CardHeaderProps={{
              title: "اطلاعات مشتری",
              icon: <LuUser className="text-gray-700" />,
              showIconInActionSlot: true,
            }}
            bodyClassName="space-y-1"
          >
            <InfoRow label="شناسه کاربر" value={`#${user.id}`} />
            <InfoRow
              label="نام"
              value={user.first_name ?? "ثبت نشده"}
              isActiveBg
            />
            <InfoRow
              label="نام خوانوادگی"
              value={user.last_name ?? "ثبت نشده"}
            />
            <InfoRow
              label="شماره موبایل"
              value={user.phone}
              hoverable
              isActiveBg
            />
            <InfoRow label="ایمیل" value={user.email || "ثبت نشده"} />
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

          <GiftWrappingCardInfos order={order}/>
        </div>

        {/* Items table / responsive */}
        <div className="mb-6">
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">
                    محصول
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 hidden sm:table-cell">
                    ویژگی
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">
                    تعداد
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 hidden md:table-cell">
                    قیمت واحد
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">
                    تخفیف
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">
                    مبلغ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {(items || []).map((it: any) => {
                  const unitPrice = it.variant?.price ?? it.product?.price ?? 0;
                  return (
                    <tr key={it.id}>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.product?.image}
                            alt={it.product?.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="text-sm">
                            <div className="font-medium">
                              {it.product?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              SKU: {it.variant?.sku ?? "-"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 align-top hidden sm:table-cell">
                        <div className="text-xs text-gray-600">
                          {renderAttributes(it.variant) || "-"}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-top">
                        <div className="text-sm">
                          {fmtPlainNumber(it.quantity)}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-top hidden md:table-cell">
                        <div className="text-sm">{fmt(unitPrice)}</div>
                      </td>

                      <td className="px-4 py-3 align-top">
                        <div className="text-sm text-rose-600">
                          {fmt(it.discount)}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-top">
                        <div className="text-sm font-medium">
                          {fmt(it.line_total)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* موبایل: هر آیتم بصورت کارت (نمایش جایگزین برای زمانی که جدول سخت می‌شود) */}
          <div className="sm:hidden mt-4 space-y-3">
            {(items || []).map((it: any) => (
              <div key={it.id} className="border rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <img
                    src={it.product?.image}
                    alt={it.product?.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{it.product?.name}</div>
                    <div className="text-xs text-gray-500">
                      {renderAttributes(it.variant) || "-"}
                    </div>
                    <div className="text-xs mt-2">
                      تعداد: {fmtPlainNumber(it.quantity)}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {fmt(it.line_total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row md:justify-end gap-4">
          <div className="w-full md:w-1/3 p-4 border rounded-lg">
            <div className="flex justify-between text-xs text-gray-600">
              <div>جمع جزء (Subtotal)</div>
              <div className="font-medium">{fmt(subtotal)}</div>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <div>تخفیف کالاها</div>
              <div className="font-medium text-rose-600">
                {fmt(productDiscounts)}
              </div>
            </div>

            {promotionDiscounts ? (
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div>کد/پروموشن</div>
                <div className="font-medium text-rose-600">
                  {fmt(promotionDiscounts)}
                </div>
              </div>
            ) : null}

            {manualDiscount ? (
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div>تخفیف دستی</div>
                <div className="font-medium text-rose-600">
                  {fmt(manualDiscount)}
                </div>
              </div>
            ) : null}

            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <div>جمع تخفیفات</div>
              <div className="font-medium text-rose-600">
                {fmt(grandTotalDiscount)}
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <div>هزینه ارسال</div>
              <div className="font-medium">{fmt(shipping_cost)}</div>
            </div>

            <div className="flex justify-between text-sm font-semibold mt-4">
              <div>مبلغ قابل پرداخت</div>
              <div className="font-bold text-lg">{fmt(total)}</div>
            </div>
          </div>
        </div>

        {/* Payment & meta */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-500">روش پرداخت</div>
            <div className="font-medium">{payment?.payment_method ?? "-"}</div>

            <div className="text-xs text-gray-500 mt-2">وضعیت پرداخت</div>
            <div className="font-medium">{payment?.status ?? "-"}</div>

            {payment?.card_to_card_status && (
              <>
                <div className="text-xs text-gray-500 mt-2">
                  وضعیت کارت‌به‌کارت
                </div>
                <div className="font-medium">{payment.card_to_card_status}</div>
              </>
            )}

            {payment?.sender_card_number && (
              <div className="text-xs text-gray-500 mt-2">
                کارت ارسال‌کننده:{" "}
                <span className="font-medium">
                  {maskCard(payment.sender_card_number)}
                </span>
              </div>
            )}

            {payment?.tracking_code && (
              <div className="text-xs text-gray-500 mt-2">
                کد پیگیری:{" "}
                <span className="font-medium">{payment.tracking_code}</span>
              </div>
            )}

            {payment?.deposit_date && (
              <div className="text-xs text-gray-500 mt-2">
                تاریخ واریز:{" "}
                <span className="font-medium">
                  {fmtDateTime(payment.deposit_date)}
                </span>
              </div>
            )}

            {payment?.admin_note && (
              <div className="text-xs text-gray-500 mt-2">
                یادداشت ادمین:{" "}
                <div className="font-medium">{payment.admin_note}</div>
              </div>
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-500">توضیحات سفارش</div>
            <div className="text-sm mt-2">{order.customer_note || "-"}</div>

            {promotions?.length ? (
              <>
                <div className="text-xs text-gray-500 mt-3">پروموشن‌ها</div>
                <ul className="text-sm list-disc list-inside mt-1">
                  {promotions.map((p: any, i: number) => (
                    <li key={i}>
                      {p.name} — {fmt(p.amount)}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <div>
            تذکر: اعداد نمایش داده شده به تومان هستند و با گرد کردن نمایش داده
            می‌شوند.
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default OrderFactor;
