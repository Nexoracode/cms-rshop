"use client";

import { useState } from "react";
import BrandCard from "@/components/features/products/brands/BrandCard";
import BrandFilters from "@/components/features/products/brands/BrandFilters";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { BrandSortBy, useGetBrands } from "@/core/hooks/api/useBrand";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import AddNewBrandModal from "@/components/features/products/brands/AddNewBrandModal";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { PiResizeBold } from "react-icons/pi";
import SizeGuideCard from "@/components/features/products/size-guide/SizeGuideCard";
import AddNewSizeGuideModal from "@/components/features/products/size-guide/AddNewSizeGuideModal";

const SizeGuidePage = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<BrandSortBy[number]>();

  const { data: size, isLoading } = useGetBrands({
    page,
    search,
    sortBy,
  });

  const isExistItems = !!size?.data?.items?.length;

  const [editBrand, setEditBrand] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditBrand = (brand: any) => {
    setEditBrand(brand);
    setIsEditOpen(true);
  };

  return (
    <>
      <AddNewSizeGuideModal
        sizGuideId={editBrand?.id || 1}
        defaultValues={editBrand}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <UnifiedCard
          searchFilter={<BrandFilters />}
          headerProps={{
            title: "مدیریت راهنمای سایز",
            icon: <PiResizeBold className="text-2xl" />,
            children: <AddNewBrandModal />,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={size?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          {size?.data?.items?.map((b: any) => (
            <SizeGuideCard key={b.id} size={b} onEdit={handleEditBrand} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default SizeGuidePage;
