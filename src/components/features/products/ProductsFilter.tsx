"use client";

import SearchFilterCard from "../../common/Card/SearchFilterCard";
import ProductsFilterModal from "./modals/ProductsFilterModal";
import ProductsSortModal from "./modals/ProductsSortModal";

const ProductsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در محصولات..."
      relatedPages={[
        { title: "ویژگی‌ها", href: "/admin/products/variants" },
        { title: "دسته‌بندی‌ها", href: "/admin/products/categories" },
        { title: "برندها", href: "/admin/products/brands" },
      ]}
    >
      <ProductsFilterModal />
      <ProductsSortModal />
    </SearchFilterCard>
  );
};

export default ProductsFilter;
