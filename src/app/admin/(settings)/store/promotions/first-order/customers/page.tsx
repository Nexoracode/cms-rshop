"use client"

// CustomersCoupon.tsx
import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { FirstOrderHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";

const CustomersCoupon = () => {
  return (
    <PromotionRouteWrapper
      Hooks={FirstOrderHooks}
      Provider={CustomersSelectionProvider}
      providerProps={{ initialCustomers: [] }}
      formType="first_order"
    >
      {({ initialData, isLoading, resetSignal, setResetSignal, handleSubmit }) => (
        <BasePromotionForm
          formType="first_order"
          scope="customers"
          initialData={initialData}
          isShowLoader={isLoading}
          onHandleReset={() => setResetSignal((p) => p + 1)}
          onHandleSubmit={(payload) => handleSubmit(payload)}
          resetSignal={resetSignal}
        />
      )}
    </PromotionRouteWrapper>
  );
}

export default CustomersCoupon;