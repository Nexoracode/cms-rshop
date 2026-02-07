"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { OrderSortBy } from "@/components/features/orders/order-types";
// Icons
import { useGetPaymentLogs } from "@/core/hooks/api/orders/usePaymentLogs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MdCheckCircle, MdOutlinePayments, MdPending } from "react-icons/md";
import PaymentLogCard from "@/components/features/orders/payment-log/PaymentLogCard";
import { RiFileList3Line } from "react-icons/ri";
import { StatCard } from "@/components/common/StatCard";
import BaseCard from "@/components/ui/BaseCard";

const Orders = () => {
  const { page, isFilteredView } = useListQueryParams<OrderSortBy[number]>();
  const { data: logs, isLoading } = useGetPaymentLogs({ page });
  const isExistItems = !!logs?.data?.length;

  const statItems =
    !isLoading && isExistItems
      ? [
          {
            title: "پرداخت‌های موفق",
            value: logs.data.filter((log: any) => log.status === "verified")
              .length,
            icon: <MdCheckCircle />,
            color: {
              from: "from-green-50",
              to: "to-green-100",
              border: "border-green-200",
              text: "text-green-700",
              icon: "text-green-800",
            },
          },
          {
            title: "در حال انتظار",
            value: logs.data.filter(
              (log: any) =>
                log.status === "callback_received" ||
                log.status === "initiated",
            ).length,
            icon: <MdPending />,
            color: {
              from: "from-blue-50",
              to: "to-blue-100",
              border: "border-blue-200",
              text: "text-blue-700",
              icon: "text-blue-800",
            },
          },
          {
            title: "کل لاگ‌ها",
            value: logs.data.length,
            icon: <MdOutlinePayments />,
            color: {
              from: "from-purple-50",
              to: "to-purple-100",
              border: "border-purple-200",
              text: "text-purple-700",
              icon: "text-purple-800",
            },
          },
        ]
      : [];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs />

      {statItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow">
          {statItems.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>
      )}

      <UnifiedCard
        headerProps={{
          title: "تاریخچه لاگ‌ها",
          icon: <RiFileList3Line className="text-2xl" />,
          showIconInActionSlot: true,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={logs?.data?.meta}
        className="mb-6"
      >
        {logs?.data?.map((log: any) => (
          <PaymentLogCard key={log.id} log={log} />
        ))}
      </UnifiedCard>
    </div>
  );
};

export default Orders;
