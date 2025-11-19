"use client";

import { useSearchParams } from "next/navigation";
import CouponForm from "@/components/features/store/promotions/coupon/CouponForm";
import { CouponHooks } from "@/core/hooks/api/usePromotions";

const CreateCoupon = () => {
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const { data: couponData, isLoading } = CouponHooks.useGetOne(id || 0);

  const handleReset = () => {};

  return (
    <CouponForm
      pageType="create"
      initialData={couponData?.data}
      isLoading={isLoading}
      onReset={handleReset}
    />
  );
};

export default CreateCoupon;
