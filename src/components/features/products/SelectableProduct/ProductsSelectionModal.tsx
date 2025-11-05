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

type SelectedProduct = Record<string, any>;

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

  // فانکشن خارجی برای مدیریت تغییر انتخاب محصولات
  const handleProductChange = (product: any, data: any) => {
    if (!data) {
      // حذف محصول از selectedProducts
      setProducts(
        selectedProducts.filter((p: SelectedProduct) => p.id !== product.id)
      );
    } else {
      // ساخت آبجکت واقعی محصول با وریانت‌های انتخاب شده
      const newSelectedItem: SelectedProduct = {
        ...product, // تمام اطلاعات واقعی محصول
        variants: data.variants?.length ? data.variants : null, // فقط وریانت‌های انتخاب شده
      };

      const newSelected: SelectedProduct[] = [
        ...selectedProducts.filter((p: SelectedProduct) => p.id !== product.id),
        newSelectedItem,
      ];

      setProducts(newSelected);
    }
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
            initialItemsSelected={selectedProducts.map(
              (p: SelectedProduct) => ({
                product_id: p.id,
                variants: p.variants,
              })
            )}
            onChange={(data) => handleProductChange(product, data)}
          />
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default ProductsSelectionModal;
