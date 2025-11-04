"use client";

import { UsersSelectionProvider } from "@/components/features/store/customers/SelectableUsersBox/UsersSelectionContext";
import CouponForm from "@/components/features/store/promotions/coupon/CouponForm";
import { useGetOneCoupon } from "@/core/hooks/api/useCoupon";
import { useSearchParams } from "next/navigation";

const CustomersCoupon = () => {
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const { data: couponData, isLoading } = useGetOneCoupon(id);

  console.log(couponData);
  
  return (
    <UsersSelectionProvider
      initialUsers={couponData?.data?.allowed_users || []}
    >
      <CouponForm
        pageType="user"
        isLoading={isLoading}
        initialData={couponData?.data}
      />
    </UsersSelectionProvider>
  );
};

export default CustomersCoupon;
