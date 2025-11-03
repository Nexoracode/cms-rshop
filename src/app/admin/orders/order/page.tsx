"use client";

import { useSearchParams } from "next/navigation";
import EntityCard from "@/components/common/Card/EntityCard";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import BackToPage from "@/components/common/Breadcrumbs";
import OrderWizard from "@/components/features/orders/OrderProccess/OrderWizard";

const OrderDetail = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("id");

  const { data: order, isLoading } = useGetOneOrder(
    orderId ? +orderId : undefined
  );

  console.log(order);

  return (
    <>
      <section className="flex flex-col gap-6">
        {/* <EntityCard
          title="مشخصات سفارش"
          textBtn="مشاهده فاکتور"
          icon={<IoReceiptOutline className="text-2xl" />}
          isLoading={isLoading}
          datas={order}
          onAdd={() => {}}
          isExistItems={!!order?.data}
          searchInp={false}
        >
          <OrderWizard order={order?.data} />
        </EntityCard> */}
      </section>
    </>
  );
};

export default OrderDetail;
