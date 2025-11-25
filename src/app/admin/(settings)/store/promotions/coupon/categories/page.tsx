"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CategoriesSelectionProvider } from "@/components/features/products/categories/SelectableCategoriesBox/CategoriesSelectionContext";

const CategoriesCoupon = () => {
  return (
    <PromotionRouteWrapper
      Hooks={CouponHooks}
      Provider={CategoriesSelectionProvider}
      providerProps={{ initialCategories: [] }}
    >
      {({ initialData, isLoading, onSubmit, resetSignal, setResetSignal }) => (
        <BasePromotionForm
          formType="coupon"
          scope="categories"
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

export default CategoriesCoupon;