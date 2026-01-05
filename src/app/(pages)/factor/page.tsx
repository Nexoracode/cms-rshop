"use client";

import OrderFactor from "@/components/features/orders/OrderFactor/OrderFactor";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import { useSearchParams } from "next/navigation";

const Factor = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: order, isLoading } = useGetOneOrder(
    orderId ? +orderId : undefined
  );

  if (isLoading) {
    return (
      <LoadingApiCall/>
    )
  }

  return <OrderFactor order={order?.data} />;
};

export default Factor;
