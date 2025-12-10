"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import CardNumberFilterModal from "./CardNumberFilterModal";
import CardNumberSortModal from "./CardNumberSortModal";

const CardNumbersFilter = () => {
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

export default CardNumbersFilter;
