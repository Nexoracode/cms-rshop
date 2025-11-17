"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/ProductsFilter";
import ProductCard from "@/components/features/products/ProductCard";
// Icons
import {
  ProductSortBy,
  useGetProducts,
} from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { MdOutlineSupportAgent } from "react-icons/md";

const Products = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: support, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!support?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<ProductsFilter />}
      headerProps={{
        title: "پشتیبانی",
        icon: <MdOutlineSupportAgent className="text-2xl" />,
        showIconInActionSlot: true        
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={support?.data?.meta}
    >
      {support?.data?.items?.map((product: any) => (
        <ProductCard product={product} />
      ))}
    </UnifiedCard>
  );
};

export default Products;
