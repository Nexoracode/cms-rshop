"use client";

import SearchFilterCard from "../../../common/Card/SearchFilterCard";
import OrdersFilterModal from "./OrdersFilterModal";
import OrdersSortingModal from "./OrdersSortModal";

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
      showSearchBar
    >
      <OrdersFilterModal />
      <OrdersSortingModal />
    </SearchFilterCard>
  );
};

export default OrdersFilter;
