"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import OrdersFilter from "@/components/features/orders/Filter/OrdersFilter";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { OrderSortBy } from "@/components/features/orders/order-types";
import { useGetOrders } from "@/core/hooks/api/orders/useOrder";
// Icons
import { GiSettingsKnobs } from "react-icons/gi";

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
        title: "تنظیمات فروشگاه",
        icon: <GiSettingsKnobs className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={orders?.data?.meta}
      className="mb-6"
      childrenClassName="grid md:grid-cols-2"
    ></UnifiedCard>
  );
};

export default Orders;
