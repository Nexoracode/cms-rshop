"use client";

import SearchFilterCard from "../shared/SearchFilterCard";
import OrdersFilterModal from "./modals/OrdersFilterModal";
import OrdersSortingModal from "./modals/OrdersSortingModal";

const OrdersFilter = () => {
  return (
    <SearchFilterCard
      relatedTitle="دسترسی سریع"
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
