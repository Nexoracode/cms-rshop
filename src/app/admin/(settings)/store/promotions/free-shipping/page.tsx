"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CouponsFilter from "@/components/features/store/promotions/coupon/Filter/CouponsFilter";
import { FreeShippingHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { FreeShippingListModal } from "@/components/features/store/promotions/free-shipping/FreeShippingListModal";
import { LiaTruckLoadingSolid } from "react-icons/lia";

const FreeShipping = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: freeShippings, isLoading } = FreeShippingHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = freeShippings?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<CouponsFilter />}
      headerProps={{
        title: "لیست ارسال رایگان",
        icon: <LiaTruckLoadingSolid className="text-2xl" />,
        children: <FreeShippingListModal />,
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={freeShippings?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default FreeShipping;
