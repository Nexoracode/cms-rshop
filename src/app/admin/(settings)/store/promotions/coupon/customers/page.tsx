"use client";

import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";
import CouponForm from "@/components/features/store/promotions/coupon/CouponForm";
import { useGetOneCoupon } from "@/core/hooks/api/useCoupon";
import { useSearchParams } from "next/navigation";

const CustomersCoupon = () => {
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const { data: couponData, isLoading } = useGetOneCoupon(id);
  
  return (
    <CustomersSelectionProvider
      initialCustomers={couponData?.data?.allowed_users || []}
    >
      <CouponForm
        pageType="customer"
        isLoading={isLoading}
        initialData={couponData?.data}
      />
    </CustomersSelectionProvider>
  );
};

export default CustomersCoupon;
