"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";

const CreateCoupon = () => {
  return (
    <PromotionRouteWrapper Hooks={CouponHooks}>
      {({ initialData, isLoading, resetSignal, setResetSignal, handleSubmit }) => (
        <BasePromotionForm
          formType="free_shipping"
          scope="general"
          initialData={initialData}
          isShowLoader={isLoading}
          onHandleReset={() => setResetSignal((p) => p + 1)}
          onHandleSubmit={(payload) => handleSubmit(payload)}
          resetSignal={resetSignal}
        />
      )}
    </PromotionRouteWrapper>
  );
};

export default CreateCoupon;