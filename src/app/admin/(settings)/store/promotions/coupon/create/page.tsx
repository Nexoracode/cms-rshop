"use client";

import { useSearchParams } from "next/navigation";

import { CouponHooks } from "@/core/hooks/api/usePromotions";

const CreateCoupon = () => {
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const { data: couponData, isLoading } = CouponHooks.useGetOne(id || 0);

  const handleReset = () => {};

  return (
  <></>
  );
};

export default CreateCoupon;
