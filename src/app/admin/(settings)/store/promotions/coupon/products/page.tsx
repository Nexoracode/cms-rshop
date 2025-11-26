"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";

const ProductsCoupon = () => {
  return (
    <PromotionRouteWrapper
      Hooks={CouponHooks}
      Provider={ProductsSelectionProvider}
      providerProps={{ initialProducts: [] }}
      formType="coupon"
    >
      {({ initialData, isLoading, resetSignal, setResetSignal, handleSubmit }) => (
        <BasePromotionForm
          formType="coupon"
          scope="products"
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

export default ProductsCoupon;