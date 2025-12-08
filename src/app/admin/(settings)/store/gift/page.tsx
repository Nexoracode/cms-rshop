"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/ProductsFilter";
import ProductCard from "@/components/features/products/ProductCard";
import { ProductSortBy } from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useGetGiftWrappings } from "@/core/hooks/api/gift/useGift";
// Icons
import { LuGift, LuPlus } from "react-icons/lu";

const Gifts = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: products, isLoading } = useGetGiftWrappings({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!products?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<ProductsFilter />}
      headerProps={{
        title: "مدیریت بسته بندی ها",
        icon: <LuGift className="text-2xl" />,
        redirect: "/admin/store/create?type=infos",
        btnIcon: <LuPlus />,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={products?.data?.meta}
    >
      {products?.data?.items?.map((product: any) => (
        <ProductCard product={product} />
      ))}
    </UnifiedCard>
  );
};

export default Gifts;
