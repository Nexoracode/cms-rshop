"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CouponHooks } from "@/core/hooks/api/usePromotions";

const CreateCoupon: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const [resetSignal, setResetSignal] = useState(0);

  const isEditMode = !!id;

  const { data: couponData, isLoading } = CouponHooks.useGetOne(id);
  const createHook = CouponHooks.useCreate();
  const updateHook = CouponHooks.useUpdate(id || 0);

  const handleSubmit = async (payload: any) => {
    if (isEditMode) {
      const resp = await updateHook.mutateAsync(payload);
      resp.ok && router.push("/admin/store/promotions");
    } else {
      const resp = await createHook.mutateAsync(payload);
      resp.ok && setResetSignal((prev) => prev + 1);
    }
  };

  return (
    <BasePromotionForm
      formType="coupon"
      scope="general"
      initialData={couponData?.data}
      isEditMode={isEditMode}
      isShowLoader={isLoading}
      onHandleSubmit={handleSubmit}
      onHandleReset={() => setResetSignal((prev) => prev + 1)}
      resetSignal={resetSignal}
    />
  );
};

export default CreateCoupon;
