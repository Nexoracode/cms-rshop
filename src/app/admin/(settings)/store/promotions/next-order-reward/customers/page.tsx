"use client"

// CustomersCoupon.tsx
import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";

const CustomersCoupon = () => {
  return (
    <PromotionRouteWrapper
      Hooks={CouponHooks}
      Provider={CustomersSelectionProvider}
      providerProps={{ initialCustomers: [] }}
    >
      {({ initialData, isLoading, resetSignal, setResetSignal }) => (
        <BasePromotionForm
          formType="next_order_reward"
          scope="customers"
          initialData={initialData}
          isShowLoader={isLoading}
          onHandleReset={() => setResetSignal((p) => p + 1)}
          resetSignal={resetSignal}
        />
      )}
    </PromotionRouteWrapper>
  );
}

export default CustomersCoupon;