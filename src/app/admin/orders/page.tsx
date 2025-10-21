"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EntityCard from "@/components/admin/shared/EntityCard";
import OrdersFilter from "@/components/admin/orders/OrdersFilter";
import { useGetOrders } from "@/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import OrderBox from "@/components/admin/orders/OrderBox";
import { Order, OrderSortBy } from "@/components/admin/orders/order-types";

const Orders = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // page
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  // search & searchBy
  const search = useMemo(() => {
    const s = searchParams.get("search")?.trim();
    return s ? s : undefined;
  }, [searchParams?.toString()]);

  const sortBy = useMemo(() => {
    const sorts = searchParams.getAll("sortBy") as OrderSortBy | string[];
    return sorts.length ? (sorts as OrderSortBy) : undefined;
  }, [searchParams?.toString()]);

  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    return Object.keys(f).length ? (f as any) : undefined;
  }, [searchParams?.toString()]);

  const { data: orders, isLoading } = useGetOrders({
    page,
    sortBy,
    filter,
    search,
  });

  const isFilteredView = !!(search || sortBy?.length || filter);

  return (
    <section className="flex flex-col gap-6">
      <OrdersFilter />

      <EntityCard
        title="لیست سفارشات"
        icon={<IoReceiptOutline className="text-2xl" />}
        isLoading={isLoading}
        datas={orders}
        onAdd={() => router.push("/admin/orders/manual-order")}
        isExistItems={!!orders?.data?.items?.length}
        searchInp={isFilteredView}
      >
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          {orders?.data?.items?.map((order: Order) => (
            <OrderBox
              key={order.id}
              order={order}
              onClicked={() => router.push(`/admin/orders/order?id=${order.id}`)}
            />
          ))}
        </div>
      </EntityCard>
    </section>
  );
};

export default Orders;
