"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CouponsFilter from "@/components/features/store/promotions/coupon/Filter/CouponsFilter";
import { useGetCoupons } from "@/core/hooks/api/useCoupon";
import { LuTicket } from "react-icons/lu";
import CouponCard from "@/components/features/store/promotions/coupon/CouponCard";
import { CouponSortBy } from "@/components/features/store/promotions/coupon/coupon-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import CouponsListModal from "@/components/features/store/promotions/coupon/CouponsListModal";

const Coupons = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<CouponSortBy[number]>();
  const { data: coupons, isLoading } = useGetCoupons({
    page,
    sortBy,
    search,
    filter,
  });

  const items = coupons?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<CouponsFilter />}
      headerProps={{
        title: "لیست کوپن ها",
        icon: <LuTicket className="text-2xl" />,
        children: <CouponsListModal />,
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={coupons?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default Coupons;
