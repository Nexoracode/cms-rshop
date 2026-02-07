"use client";

import {
  MdCheckCircle,
  MdPending,
  MdAccessTime,
  MdPerson,
  MdReceipt,
  MdCreditCard,
  MdInfo,
  MdExpandMore,
  MdExpandLess,
  MdPayment,
  MdCreditScore,
  MdSchedule,
} from "react-icons/md";
import { useState } from "react";
import { formatDate } from "@/core/utils/date";
import InfoRow from "@/components/shared/InfoRow";
import DeviceInfo from "./DeviceInfo";

// Helper function to format currency
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("fa-IR").format(num) + " تومان";
};

// Helper function to get payment status color and icon
const getPaymentStatusConfig = (status: string) => {
  switch (status) {
    case "success":
      return {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <MdCheckCircle className="text-green-500" />,
        text: "موفق",
      };
    case "in_progress":
      return {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <MdSchedule className="text-blue-500" />,
        text: "در حال پردازش",
      };
    case "pending":
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <MdPending className="text-yellow-500" />,
        text: "در انتظار",
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <MdInfo className="text-gray-500" />,
        text: status,
      };
  }
};

// Helper function to get payment method info
const getPaymentMethodInfo = (method: string) => {
  switch (method) {
    case "online":
      return { text: "آنلاین", icon: <MdPayment className="text-blue-500" /> };
    case "card_to_card":
      return {
        text: "کارت به کارت",
        icon: <MdCreditScore className="text-purple-500" />,
      };
    default:
      return { text: method, icon: <MdCreditCard className="text-gray-500" /> };
  }
};

// Payment Card Component (با ساختار جدید)
const PaymentCard = ({ payment }: { payment: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = getPaymentStatusConfig(payment.status);
  const paymentMethodInfo = getPaymentMethodInfo(payment.payment_method);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${statusConfig.color} border`}>
              {statusConfig.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">پرداخت #{payment.id}</h3>
              <p className="text-sm text-gray-600 mt-1">{payment.message}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            {isExpanded ? (
              <MdExpandLess size={24} />
            ) : (
              <MdExpandMore size={24} />
            )}
          </button>
        </div>

        {/* Quick Info Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="flex items-center gap-2">
            <MdPerson className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">کاربر</p>
              <p className="text-sm font-medium">
                {payment.user?.first_name} {payment.user?.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MdReceipt className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">سفارش</p>
              <p className="text-sm font-medium">#{payment.order?.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MdCreditCard className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">مبلغ</p>
              <p className="text-sm font-medium">
                {formatCurrency(payment.amount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MdAccessTime className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">زمان</p>
              <p className="text-sm font-medium">
                {formatDate(payment.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3 mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
          >
            {statusConfig.text}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600">
            {paymentMethodInfo.icon}
            {paymentMethodInfo.text}
          </span>
          {payment.gateway && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              درگاه: {payment.gateway}
            </span>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="space-y-4">
            {/* Payment Information */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow
                  label="کد رهگیری"
                  value={payment.authority}
                  hoverable
                />
                {payment.ref_id && (
                  <InfoRow label="کد پیگیری" value={payment.ref_id} hoverable />
                )}
                {payment.card_to_card_status && (
                  <div>
                    <p className="text-sm text-gray-600">وضعیت کارت به کارت</p>
                    <p className="font-medium">{payment.card_to_card_status}</p>
                  </div>
                )}
                {payment.tracking_code && (
                  <div>
                    <p className="text-sm text-gray-600">کد رهگیری</p>
                    <p className="font-medium">{payment.tracking_code}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            {payment.order && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-3">خلاصه سفارش</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">جمع جزء</p>
                    <p className="font-medium">
                      {formatCurrency(payment.order.subtotal)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تخفیف</p>
                    <p className="font-medium text-green-600">
                      {formatCurrency(payment.order.discount_total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">هزینه ارسال</p>
                    <p className="font-medium">
                      {formatCurrency(payment.order.shipping_cost)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">جمع کل</p>
                    <p className="font-bold text-lg">
                      {formatCurrency(payment.order.total)}
                    </p>
                  </div>
                </div>

                {/* Order Status */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">وضعیت سفارش</p>
                  <p className="font-medium capitalize">
                    {payment.order.status}
                  </p>
                </div>
              </div>
            )}

            {/* User Information */}
            {payment.user && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-3">اطلاعات کاربر</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">نام</p>
                    <p className="font-medium">
                      {payment.user.first_name} {payment.user.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تلفن</p>
                    <p className="font-medium">{payment.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ایمیل</p>
                    <p className="font-medium">{payment.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">وضعیت</p>
                    <span
                      className={`px-2 py-1 rounded text-xs ${payment.user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {payment.user.is_active ? "فعال" : "غیرفعال"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Logs Section */}
            {payment.logs && payment.logs.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">
                  تاریخچه لاگ‌ها ({payment.logs.length})
                </h4>
                <div className="space-y-3">
                  {payment.logs.map((log: any) => {
                    const logStatus = getPaymentStatusConfig(log.status);
                    return (
                      <div key={log.id} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${logStatus.color}`}>
                              {logStatus.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {log.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(log.created_at)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs ${logStatus.color}`}
                          >
                            {logStatus.text}
                          </span>
                        </div>
                        {log.ip && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs">
                            <p className="text-gray-600">IP: {log.ip}</p>
                            {log.payload &&
                              Object.keys(log.payload).length > 0 && (
                                <details className="mt-1">
                                  <summary className="cursor-pointer text-blue-600">
                                    نمایش جزئیات
                                  </summary>
                                  <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                                    {JSON.stringify(log.payload, null, 2)}
                                  </pre>
                                </details>
                              )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Details */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">
                اطلاعات دستگاه کاربر
              </h4>

              {payment.logs && payment.logs.length > 0 ? (
                <div className="space-y-4">
                  {payment.logs
                    .filter((log: any) => log.user_agent)
                    .map((log: any, index: number) => (
                      <DeviceInfo
                        key={log.id || index}
                        userAgent={log.user_agent}
                        ip={log.ip}
                        timestamp={log.created_at}
                      />
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  اطلاعات دستگاه در دسترس نیست
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
