"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import CouponsSortModal from "./CouponsSortModal";
import CouponsFilterModal from "./CouponsFilterModal";

const CouponsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در کد تخفیف ها..."
      showSearchBar
    >
      <CouponsFilterModal />
      <CouponsSortModal />
    </SearchFilterCard>
  );
};

export default CouponsFilter;
