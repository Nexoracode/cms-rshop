"use client";

import { useState } from "react";
// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/Filter/ProductsFilter";
import ProductsBulkActions from "@/components/features/products/Filter/ProductsBulkActions";
import ProductCard from "@/components/features/products/ProductCard";
import SelectableCard from "@/components/ui/SelectableCard";
import {
  ProductSortBy,
  useGetProducts,
} from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
// Icons
import { LuPlus } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";

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
    <>
      <ShopInfosCard />
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
                selected ? [...prev, id] : prev.filter((x: any) => x !== id)
              )
            }
          >
            <ProductCard product={product} />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </>
  );
};

export default Products;
