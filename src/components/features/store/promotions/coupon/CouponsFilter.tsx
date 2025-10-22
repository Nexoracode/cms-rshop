"use client";

import SearchFilterCard from "@/components/common/SearchFilterCard";
import CouponsSortModal from "./CouponsSortModal";
import CouponsFilterModal from "./CouponsFilterModal";

const CouponsFilter = () => {
  return (
    <SearchFilterCard
      relatedTitle="اعمال کد تخفیف برای"
      relatedPages={[
        { title: "محصولات", href: "/admin/store/promotions/coupon/products" },
        { title: "دسته بندی ها", href: "/admin/store/promotions/coupon/categories" },
        { title: "کاربران", href: "/admin/store/promotions/coupon/users" },
      ]}
      searchPlaceholder="جستجو در کد تخفیف ها..."
    >
      <CouponsFilterModal />
      <CouponsSortModal />
    </SearchFilterCard>
  );
};

export default CouponsFilter;
