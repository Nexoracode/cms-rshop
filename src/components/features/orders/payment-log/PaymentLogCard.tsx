"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { OrderSortBy } from "@/components/features/orders/order-types";
// Icons
import { useGetPaymentLogs } from "@/core/hooks/api/orders/usePaymentLogs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { 
  MdOutlinePayments, 
  MdCheckCircle, 
  MdPending, 
  MdError,
  MdAccessTime,
  MdPerson,
  MdReceipt,
  MdCreditCard,
  MdLocationOn,
  MdInfo,
  MdExpandMore,
  MdExpandLess
} from "react-icons/md";
import { useState } from "react";

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Helper function to format currency
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseInt(amount) : amount;
  return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
};

// Helper function to get status color and icon
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'verified':
      return {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <MdCheckCircle className="text-green-500" />,
        text: 'تایید شده'
      };
    case 'callback_received':
      return {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <MdAccessTime className="text-blue-500" />,
        text: 'دریافت کالبک'
      };
    case 'initiated':
      return {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <MdPending className="text-yellow-500" />,
        text: 'شروع شده'
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <MdInfo className="text-gray-500" />,
        text: status
      };
  }
};

// Log Card Component
const PaymentLogCard = ({ log }: { log: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = getStatusConfig(log.status);

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
              <h3 className="font-bold text-gray-900">لاگ پرداخت #{log.id}</h3>
              <p className="text-sm text-gray-600 mt-1">{log.message}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            {isExpanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
          </button>
        </div>

        {/* Quick Info Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="flex items-center gap-2">
            <MdPerson className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">کاربر</p>
              <p className="text-sm font-medium">
                {log.user?.first_name} {log.user?.last_name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MdReceipt className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">سفارش</p>
              <p className="text-sm font-medium">#{log.order?.id}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MdCreditCard className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">مبلغ</p>
              <p className="text-sm font-medium">{formatCurrency(log.order?.total)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">زمان</p>
              <p className="text-sm font-medium">{formatDate(log.created_at)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="space-y-4">
            {/* Status Section */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                وضعیت پرداخت
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                  {statusConfig.text}
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Authority</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 truncate">
                    {log.authority}
                  </p>
                </div>
                {log.ref_id && (
                  <div>
                    <p className="text-sm text-gray-600">Ref ID</p>
                    <p className="font-medium">{log.ref_id}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            {log.payload && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-3">جزئیات پرداخت</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {log.payload.fee && (
                    <div>
                      <p className="text-sm text-gray-600">کارمزد</p>
                      <p className="font-medium">{formatCurrency(log.payload.fee)}</p>
                    </div>
                  )}
                  {log.payload.card_pan && (
                    <div>
                      <p className="text-sm text-gray-600">شماره کارت</p>
                      <p className="font-medium">{log.payload.card_pan}</p>
                    </div>
                  )}
                  {log.payload.shaparak_fee && (
                    <div>
                      <p className="text-sm text-gray-600">کارمزد شاپرک</p>
                      <p className="font-medium">{formatCurrency(log.payload.shaparak_fee)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Summary */}
            {log.order && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-3">خلاصه سفارش</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">جمع جزء</p>
                    <p className="font-medium">{formatCurrency(log.order.subtotal)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تخفیف</p>
                    <p className="font-medium text-green-600">
                      {formatCurrency(log.order.discount_total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">هزینه ارسال</p>
                    <p className="font-medium">{formatCurrency(log.order.shipping_cost)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">جمع کل</p>
                    <p className="font-bold text-lg">{formatCurrency(log.order.total)}</p>
                  </div>
                </div>
                
                {/* Address */}
                {log.order.address && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <MdLocationOn className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">آدرس تحویل</p>
                        <p className="text-sm">
                          {log.order.address.province}، {log.order.address.city}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {log.order.address.address_line}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Technical Details */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">اطلاعات فنی</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">IP Address</p>
                  <p className="font-mono">{log.ip}</p>
                </div>
                <div>
                  <p className="text-gray-600">User Agent</p>
                  <p className="font-mono truncate" title={log.user_agent}>
                    {log.user_agent?.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentLogCard