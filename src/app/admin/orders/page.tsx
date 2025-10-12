"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import CardContent from "@/components/Admin/CardContent";
import OrdersFilter from "@/components/Admin/_orders/OrdersFilter";
import { useGetOrders, OrderSortBy } from "@/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import OrderBox from "@/components/Admin/_orders/OrderBox";

const Orders = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // page
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  // sortBy
  const sortBy = useMemo(() => {
    const sorts = searchParams.getAll("sortBy") as OrderSortBy | string[];
    return sorts.length ? (sorts as OrderSortBy) : undefined;
  }, [searchParams?.toString()]);

  // API call
  const { data: orders, isLoading } = useGetOrders({ page, limit: 20, sortBy });

  const isFilteredView = !!(sortBy?.length);

  return (
    <>
      {!selectedOrderId ? (
        <section className="flex flex-col gap-6">
          <OrdersFilter />

          <CardContent
            title="لیست سفارشات"
            icon={<IoReceiptOutline className="text-2xl" />}
            isLoading={isLoading}
            datas={orders}
            onAdd={() => router.push("/admin/orders/manual-order")}
            isExistItems={!!orders?.data?.items?.length}
            searchInp={isFilteredView}
          >
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              {orders?.data?.items?.map((order: any) => (
                <OrderBox
                  key={order.id}
                  order={order} // کل آبجکت رو مستقیم پاس می‌دیم
                  onClicked={() => setSelectedOrderId(order.id)}
                />
              ))}
            </div>
          </CardContent>
        </section>
      ) : (
        <div className="mt-6">
          <Button variant="flat" onPress={() => setSelectedOrderId(null)}>
            بازگشت
          </Button>
        </div>
      )}
    </>
  );
};

export default Orders;
