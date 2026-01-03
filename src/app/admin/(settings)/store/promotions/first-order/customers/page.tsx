"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { FirstOrderHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";
import { useState } from "react";

const CustomersCoupon = () => {
  const [users, setUsers] = useState([]);
  return (
    <PromotionRouteWrapper
      Hooks={FirstOrderHooks}
      Provider={CustomersSelectionProvider}
      providerProps={{ initialCustomers: users }}
      formType="first_order"
    >
      {({
        initialData,
        isLoading,
        resetSignal,
        setResetSignal,
        handleSubmit,
      }) => {
        setUsers(
          initialData?.conditions?.find((cond: any) => cond.type === "user")
            ?.users
        );
        return (
          <BasePromotionForm
            formType="first_order"
            scope="customers"
            initialData={initialData}
            isShowLoader={isLoading}
            onHandleReset={() => setResetSignal((p) => p + 1)}
            onHandleSubmit={(payload) => handleSubmit(payload)}
            resetSignal={resetSignal}
          />
        );
      }}
    </PromotionRouteWrapper>
  );
};

export default CustomersCoupon;
