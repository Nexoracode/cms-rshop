"use client";

import {
  ProductSortBy,
  useGetProducts,
} from "@/core/hooks/api/products/useProduct";
import { BsShop } from "react-icons/bs";
import ProductsFilter from "@/components/features/products/ProductsFilter";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { LuPlus } from "react-icons/lu";
import ProductVariants from "../ProductVariants/ProductVariants";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useProductsSelection } from "./ProductsSelectionContext";

type Product = {
    [x: string]: any;
}

const ProductsSelectionModal = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();
  const { selectedProducts, setProducts } = useProductsSelection();

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!products?.data?.items?.length;

  const handleProductChange = (
    data: Product | null,
    productId: number
  ) => {
    setProducts((prev: Product[]) => {
      if (!data) {
        // حذف محصولی که از انتخاب خارج شده
        return prev.filter((p: any) => p.id !== productId);
      } else {
        // اضافه کردن یا به‌روزرسانی محصول با فرمت کامل
        const filtered = prev.filter((p) => p.id !== data.id);
        return [...filtered, data];
      }
    });
  };

  return (
    <BaseModal
      title="انتخاب محصولات"
      icon={<BsShop />}
      isActiveFooter={false}
      size="3xl"
    >
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
        {products?.data?.items?.map((product: any) => (
          <ProductVariants
            key={product.id}
            product={product}
            initialItemsSelected={selectedProducts}
            onChange={(data) => handleProductChange(data, product.id)}
          />
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default ProductsSelectionModal;
