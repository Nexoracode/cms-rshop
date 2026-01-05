"use client";

import OrderFactor from "@/components/features/orders/OrderFactor/OrderFactor";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import { useSearchParams } from "next/navigation";

const Factor = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: order, isLoading } = useGetOneOrder(
    orderId ? +orderId : undefined
  );

  return <OrderFactor order={order?.data} />;
};

export default Factor;
