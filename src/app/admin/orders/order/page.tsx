"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import OrderWizard from "@/components/features/orders/OrderProccess/OrderWizard";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { GoArrowUpRight } from "react-icons/go";
import OrderProccessFilter from "@/components/features/orders/OrderProccess/OrderProccessFilter";

const OrderDetail = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: order, isLoading } = useGetOneOrder(
    orderId ? +orderId : undefined
  );

  const orderData = order?.data;

  return (
    <UnifiedCard
      searchFilter={<OrderProccessFilter customerId={orderData?.user?.id} customerName={`${orderData?.user?.last_name}`}/>}
      isLoading={isLoading}
      isExistItems={!!orderData}
      searchInp={false}
      headerProps={{
        title: orderData?.is_manual ? "مشخصات سفارش (دستی)" : "مشخصات سفارش",
        icon: <IoReceiptOutline className="text-2xl" />,
        textBtn: "مشاهده فاکتور",
        btnIcon: <GoArrowUpRight />,
      }}
    >
      <OrderWizard order={orderData} />
    </UnifiedCard>
  );
};

export default OrderDetail;
