"use client";

import { useMemo, useState } from "react";
// Components
import ProductBox from "@/components/features/products/ProductBox";
import { useSearchParams } from "next/navigation";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/ProductsFilter";
import ProductsBulkActions from "@/components/features/products/ProductsBulkActions";
// Icons
import {
  ProductSortBy,
  useGetProducts,
} from "@/hooks/api/products/useProduct";
import { LuPlus } from "react-icons/lu";
import { BsShop } from "react-icons/bs";

const Products = () => {
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // get page
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  // sortBy
  const sortBy = useMemo(() => {
    // searchParams.getAll exists on URLSearchParams - در next/navigation هم کار می‌کند
    const sorts = searchParams.getAll("sortBy") as ProductSortBy | string[];
    return sorts.length ? (sorts as ProductSortBy) : undefined;
  }, [searchParams?.toString()]);

  // search & searchBy
  const search = useMemo(() => {
    const s = searchParams.get("search")?.trim();
    return s ? s : undefined;
  }, [searchParams?.toString()]);

  // Filters
  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    // 'entries()' را به آرایه تبدیل می‌کنیم تا dependency string کار کند
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    // cast به type مناسب (همان ProductFilter)
    return Object.keys(f).length ? (f as any) : undefined;
  }, [searchParams?.toString()]);

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isFilteredView = !!(search || sortBy?.length || filter);
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
