"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import PromotionsSortModal from "../../PromotionsSortModal";
import CouponsFilterModal from "./CouponsFilterModal";

const CouponsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در کد تخفیف ها..."
      showSearchBar
    >
      <CouponsFilterModal />
      <PromotionsSortModal />
    </SearchFilterCard>
  );
};

export default CouponsFilter;
