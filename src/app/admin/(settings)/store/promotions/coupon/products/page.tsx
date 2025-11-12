"use client";

import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import CouponForm from "@/components/features/store/promotions/coupon/CouponForm";
import { useGetOneCoupon } from "@/core/hooks/api/useCoupon";
import { useSearchParams } from "next/navigation";

const ProductsCoupon = () => {
  //const { setCustomers } = useCustomersSelection();

  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;
  const { data: couponData, isLoading } = useGetOneCoupon(id);

  const handleReset = () => {
    //setCustomers([]);
  };
  console.log(couponData?.data?.allowed_products);
  
  return (
    <ProductsSelectionProvider
      initialProducts={couponData?.data?.allowed_products || []}
    >
      <CouponForm
        pageType="product"
        isLoading={isLoading}
        initialData={couponData?.data}
        onReset={handleReset}
      />
    </ProductsSelectionProvider>
  );
};

export default ProductsCoupon;
