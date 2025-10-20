"use client";

import SearchFilterCard from "../shared/SearchFilterCard";
import ProductFilterModal from "./modals/ProductFilterModal";
import ProductSortModal from "./modals/ProductSortModal";

const ProductsFilter = () => {
  return (
    <SearchFilterCard
      relatedTitle="صفحات مرتبط"
      searchPlaceholder="جستجو در محصولات..."
      relatedPages={[
        { title: "ویژگی‌ها", href: "/admin/products/variants" },
        { title: "دسته‌بندی‌ها", href: "/admin/products/categories" },
        { title: "برندها", href: "/admin/products/brands" },
      ]}
    >
      <ProductFilterModal />
      <ProductSortModal />
    </SearchFilterCard>
  );
};

export default ProductsFilter;
