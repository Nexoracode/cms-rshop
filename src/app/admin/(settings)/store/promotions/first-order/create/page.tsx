"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";

const CreateCoupon = () => {
  return (
    <PromotionRouteWrapper Hooks={CouponHooks}>
      {({ initialData, isLoading, onSubmit, resetSignal, setResetSignal }) => (
        <BasePromotionForm
          formType="first_order"
          scope="general"
          initialData={initialData}
          isShowLoader={isLoading}
          onHandleSubmit={onSubmit}
          onHandleReset={() => setResetSignal((p) => p + 1)}
          resetSignal={resetSignal}
        />
      )}
    </PromotionRouteWrapper>
  );
};

export default CreateCoupon;