"use client";

import SearchFilterCard from "@/components/shared/SearchFilterCard";
import CustomersSortModal from "./modals/CustomersSortModal";
import CustomersFilterModal from "./modals/CustomersFilterModal";

const CustomersFilter = () => {
  return (
    <SearchFilterCard
      relatedTitle="دسترسی سریع"
      relatedPages={[
        { title: "سفارش‌ها", href: "/admin/orders" },
        { title: "پروموشن‌ها", href: "/admin/store/promotions" },
      ]}
      searchPlaceholder="جستجو نام، شماره تماس یا ایمیل کاربر..."
    >
      <CustomersFilterModal />
      <CustomersSortModal />
    </SearchFilterCard>
  );
};

export default CustomersFilter;
