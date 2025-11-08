"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useGetProducts } from "@/core/hooks/api/products/useProduct";
import { TfiShoppingCartFull } from "react-icons/tfi";
import ProductCard from "../products/ProductCard";

const ProductListMostViewed = () => {
  const { data: products, isLoading } = useGetProducts({ page: 1, limit: 5 });

  const isExistItems = !!products?.data?.items?.length;

  return (
    <UnifiedCard
      headerProps={{
        title: "پربازدیدترین محصولات",
        icon: <TfiShoppingCartFull className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
    >
      {products?.data?.items?.map((product: any, index: number) => (
        <ProductCard key={index} product={product} disableAction />
      ))}
    </UnifiedCard>
  );
};

export default ProductListMostViewed;
