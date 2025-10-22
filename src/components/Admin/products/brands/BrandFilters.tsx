"use client";

import SearchFilterCard from "../../../shared/SearchFilterCard";
import SortBrandsModal from "./SortingBrandsModal";

const BrandFilters = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در برندها..."
    >
      <SortBrandsModal />
    </SearchFilterCard>
  );
};

export default BrandFilters;
