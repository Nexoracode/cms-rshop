"use client";

import SearchFilterCard from "@/components/admin/shared/SearchFilterCard";
import UsersFilterModal from "./modals/UsersFilterModal";
import UsersSortModal from "./modals/UsersSortModal";

const UsersFilter = () => {
  return (
    <SearchFilterCard
      relatedTitle="دسترسی سریع"
      relatedPages={[
        { title: "سفارش‌ها", href: "/admin/orders" },
        { title: "پروموشن‌ها", href: "/admin/store/promotions" },
      ]}
      searchPlaceholder="جستجو نام، شماره تماس یا ایمیل کاربر..."
    >
      <UsersFilterModal />
      <UsersSortModal />
    </SearchFilterCard>
  );
};

export default UsersFilter;
