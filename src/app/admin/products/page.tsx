"use client";

import { useState } from "react";
// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/ProductsFilter";
import ProductsBulkActions from "@/components/features/products/ProductsBulkActions";
import ProductCard from "@/components/features/products/ProductCard";
// Icons
import { ProductSortBy, useGetProducts } from "@/core/hooks/api/products/useProduct";
import { LuPlus } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import SelectableCard from "@/components/ui/SelectableCard";

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
        <SelectableCard
          key={product.id}
          id={product.id}
          selectedIds={selectedItems}
          onSelectionChange={(id, selected) =>
            setSelectedItems((prev: any) =>
              selected ? [...prev, id] : prev.filter((x:any) => x !== id)
            )
          }
        >
          <ProductCard product={product} />
        </SelectableCard>
      ))}
    </UnifiedCard>
  );
};

export default Products;
