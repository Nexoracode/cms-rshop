"use client";

import BrandCard from "@/components/features/products/brands/BrandCard";
import BrandFilters from "@/components/features/products/brands/BrandFilters";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { BrandSortBy, useGetBrands } from "@/hooks/api/useBrand";
import { TbBrandArc } from "react-icons/tb";
import { LuPlus } from "react-icons/lu";
import { useListQueryParams } from "@/hooks/common/useListQueryParams";
import AddNewBrandModal from "@/components/features/products/brands/AddNewBrandModal";
import { useState } from "react";

const BrandsProduct = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<BrandSortBy[number]>();

    const [editBrand, setEditBrand] = useState<Record<string, any>>({})

  const { data: brands, isLoading } = useGetBrands({
    page,
    search,
    sortBy,
  });

  const isExistItems = !!brands?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<BrandFilters />}
      headerProps={{
        title: "مدیریت برندها",
        icon: <TbBrandArc className="text-2xl" />,
        btnIcon: <LuPlus />,
        children: (
          <AddNewBrandModal
            key={editBrand?.id ?? "new"}
            defaultValues={editBrand}
            brandId={editBrand?.id}
          />
        ),
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={brands?.data?.meta}
      childrenClassName="grid grid-cols-3"
    >
      {brands?.data?.items?.map((b: any) => {
        return <BrandCard key={b.id} brand={b} />;
      })}
    </UnifiedCard>
  );
};

export default BrandsProduct;