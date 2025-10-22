"use client";

import SearchFilterCard from "../../../common/SearchFilterCard";
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
