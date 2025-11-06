"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import OrdersFilter from "@/components/features/orders/OrdersFilter";
import OrderBox from "@/components/features/orders/OrderBox";

// Icons
import { useGetOrders } from "@/core/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import { Order, OrderSortBy } from "@/components/features/orders/order-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";

const Orders = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<OrderSortBy[number]>();

  const { data: orders, isLoading } = useGetOrders({
    page,
    sortBy,
    filter,
    search,
  });

  const isExistItems = !!orders?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<OrdersFilter />}
      headerProps={{
        title: "مدیریت سفارشات",
        icon: <IoReceiptOutline className="text-2xl" />,
        redirect: "/admin/orders/manual-order",
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={orders?.data?.meta}
      className="mb-6"
      childrenClassName="grid sm:grid-cols-2"
    >
      {orders?.data?.items?.map((order: Order) => (
        <OrderBox
          key={order.id}
          order={order}
        />
      ))}
    </UnifiedCard>
  );
};

export default Orders;
