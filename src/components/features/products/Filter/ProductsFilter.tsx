"use client";

import SearchFilterCard from "../../../common/Card/SearchFilterCard";
import ProductsFilterModal from "./ProductsFilterModal";
import ProductsSortModal from "./ProductsSortModal";

const ProductsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در محصولات..."
      relatedPages={[
        { title: "تنوع محصولات", href: "/admin/products/variants" },
        { title: "دسته‌بندی‌ها", href: "/admin/products/categories" },
        { title: "برندها", href: "/admin/products/brands" },
      ]}
      showSearchBar
    >
      <ProductsFilterModal />
      <ProductsSortModal />
    </SearchFilterCard>
  );
};

export default ProductsFilter;
