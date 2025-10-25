"use client";

import {useState } from "react";
// Components
import ProductBox from "@/components/features/products/ProductBox";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/ProductsFilter";
import ProductsBulkActions from "@/components/features/products/ProductsBulkActions";
// Icons
import { ProductSortBy, useGetProducts } from "@/hooks/api/products/useProduct";
import { LuPlus } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { useListQueryParams } from "@/hooks/common/useListQueryParams";

const Products = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data: products, isLoading } = useGetProducts({
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
        title: "مدیریت محصولات",
        icon: <BsShop className="text-2xl" />,
        redirect: "/admin/products/create?type=infos",
        btnIcon: <LuPlus />,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={products?.data?.meta}
    >
      {selectedItems.length > 0 && (
        <ProductsBulkActions
          selectedItems={selectedItems}
          onClearSelection={() => setSelectedItems([])}
        />
      )}

      {products?.data?.items?.map((product: any) => (
        <ProductBox
          key={product.id}
          product={product}
          onSelect={(id, selected) =>
            setSelectedItems((prev) =>
              selected ? [...prev, id] : prev.filter((x) => x !== id)
            )
          }
          selectedIds={selectedItems}
        />
      ))}
    </UnifiedCard>
  );
};

export default Products;
