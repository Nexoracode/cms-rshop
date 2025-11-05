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

//type VariantItem = { id: number; quantity: number };
//type OnSelectOutput = { product_id: number; variants: VariantItem[] | null };

const ProductsSelectionModal = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!products?.data?.items?.length;

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
          <ProductVariants key={product.id} product={product} />
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default ProductsSelectionModal;
