"use client";

import React, { useRef } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { GoArrowUpRight } from "react-icons/go";
import { IoReceiptOutline } from "react-icons/io5";
import { statusMap } from "@/core/constants/statusMap";
import { StatusOrder } from "../order-types";
import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { TbTruckDelivery } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import OrderInvoiceInfos from "../OrderProccess/OrderCardInfos/OrderInvoiceInfos";
import PaymentCardInfos from "../OrderProccess/OrderCardInfos/PaymentCardInfos";

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

const renderAttributes = (variant: any) => {
  if (!variant?.attributes?.length) return null;
  return variant.attributes
    .map((a: any) => `${a.name}: ${a.value}`)
    .join(" • ");
};

const OrderFactor: React.FC<OrderFactorProps> = ({ order }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return null;

  const {
    id,
    created_at,
    gift_wrapping_cost,
    is_gift,
    gift_message,
    user,
    address,
    items,
    customer_note,
  } = order;
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                  ? "مشتری"
                  : `${address.recipient_name} (${
                      address.recipient_phone || "بدون شماره"
                    })`
              }
            />
            <InfoRow
              label="کد پستی"
              value={address.postal_code}
              isActiveBg
              hoverable
            />
            <InfoRow
              label="استان و شهر"
              value={`${address.province}، ${address.city}`}
              hoverable
            />
            <InfoRow
              label="آدرس"
              value={`${address.address_line} ${
                address.plaque && `، پلاک ${address.plaque}`
              } ${address.unit && `، واحد ${address.unit}`}`}
              hoverable
              isActiveBg
              valueStyle="group-hover:relative group-hover:pb-3 group-hover:text-right"
            />
            <InfoRow
              label="توضیحات"
              value={customer_note ?? "توضیحی وجود ندارد"}
              hoverable
              valueStyle="group-hover:relative group-hover:pb-3 group-hover:text-right"
            />
          </BaseCard>

          <PaymentCardInfos order={order} />

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
