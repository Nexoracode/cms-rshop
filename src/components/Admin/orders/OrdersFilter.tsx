"use client";

import SearchFilterCard from "../shared/SearchFilterCard";
import OrdersFilterModal from "./modals/OrdersFilterModal";
import OrdersSortingModal from "./modals/OrdersSortModal";

const OrdersFilter = () => {
  return (
    <SearchFilterCard
      relatedPages={[
        {
          title: "پروموشن‌ها",
          href: "/admin/store/promotions",
        },
        {
          title: "مشتریان",
          href: "/admin/store/customers",
        },
      ]}
      searchPlaceholder="جستجو کد سفارش، نام مشتری یا محصول..."
    >
      <OrdersFilterModal />
      <OrdersSortingModal />
    </SearchFilterCard>
  );
};

export default OrdersFilter;
