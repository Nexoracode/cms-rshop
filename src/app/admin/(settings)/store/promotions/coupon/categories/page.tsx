"use client";

import { CategoriesSelectionProvider } from "@/components/features/products/categories/SelectableCategoriesBox/CategoriesSelectionContext";
import CouponForm from "@/components/features/store/promotions/coupon/CouponForm";
import { useGetOneCoupon } from "@/core/hooks/api/useCoupon";
import { useSearchParams } from "next/navigation";

const CategoriesCoupon = () => {
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const { data: couponData, isLoading } = useGetOneCoupon(id);
  
  return (
    <CategoriesSelectionProvider
      initialCategories={couponData?.data?.allowed_categories || []}
    >
      <CouponForm
        pageType="category"
        isLoading={isLoading}
        initialData={couponData?.data}
      />
    </CategoriesSelectionProvider>
  );
};

export default CategoriesCoupon;
