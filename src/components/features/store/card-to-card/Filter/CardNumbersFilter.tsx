"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import CardNumberFilterModal from "./CardNumberFilterModal";
import CardNumberSortModal from "./CardNumberSortModal";

const GiftsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در شماره کارت ها..."
      showSearchBar
    >
      <CardNumberFilterModal />
      <CardNumberSortModal />
    </SearchFilterCard>
  );
};

export default GiftsFilter;
