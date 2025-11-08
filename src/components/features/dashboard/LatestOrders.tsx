"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { IoReceiptOutline } from "react-icons/io5";
import { Order } from "../orders/order-types";
import OrderBox from "@/components/features/orders/OrderBox";
import { useGetOrders } from "@/core/hooks/api/orders/useOrder";

const LatestOrders = () => {
  const { data: orders, isLoading } = useGetOrders({
    page: 1,
    limit: 4,
  });

  const isExistItems = !!orders?.data?.items?.length;

  return (
    <UnifiedCard
      headerProps={{
        title: "جدیدترین سفارشات",
        icon: <IoReceiptOutline className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      childrenClassName="grid md:grid-cols-2"
    >
      {orders?.data?.items?.map((order: Order) => (
        <OrderBox key={order.id} order={order} disableAction/>
      ))}
    </UnifiedCard>
  );
};

export default LatestOrders;
