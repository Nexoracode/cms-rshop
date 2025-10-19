"use client";

import { useSearchParams } from "next/navigation";
import CardContent from "@/components/Admin/CardContent";
import { useGetOneOrder } from "@/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import BackToPage from "@/components/Helper/BackToPage";
import { OrderData } from "@/components/Admin/_orders/order-types";
import OrderProcess from "@/components/Admin/_orders/OrderProccess/OrderProcess";

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
        <BackToPage title="بازگشت" link="/admin/orders" />

        <CardContent
          title="مشخصات سفارش"
          textBtn="مشاهده فاکتور"
          icon={<IoReceiptOutline className="text-2xl" />}
          isLoading={isLoading}
          datas={order}
          onAdd={() => {}}
          isExistItems={!!order?.data}
          searchInp={false}
        >
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <OrderProcess />
          </div>
        </CardContent>
      </section>
    </>
  );
};

export default OrderDetail;
