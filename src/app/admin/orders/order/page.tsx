"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import OrderWizard from "@/components/features/orders/OrderProccess/OrderWizard";
import UnifiedCard from "@/components/common/Card/UnifiedCard";

const OrderDetail = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: order, isLoading } = useGetOneOrder(
    orderId ? +orderId : undefined
  );

  return (
    <UnifiedCard
      isLoading={isLoading}
      isExistItems={!!order?.data}
      searchInp={false}
      headerProps={{
        title: "مشخصات سفارش",
        icon: <IoReceiptOutline className="text-2xl" />,
        textBtn: "مشاهده فاکتور",
        onAdd: () => {
          window.open(`/orders/invoice/${orderId}`, "_blank");
        },
      }}
    >
      <OrderWizard order={order?.data} />
    </UnifiedCard>
  );
};

export default OrderDetail;
