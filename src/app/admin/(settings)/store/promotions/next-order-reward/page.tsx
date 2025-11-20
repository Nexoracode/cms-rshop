"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CouponsFilter from "@/components/features/store/promotions/coupon/Filter/CouponsFilter";
import { NextOrderRewardHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { NextOrderRewardListModal } from "@/components/features/store/promotions/next-order-reward/NextOrderRewardListModal";
import { TbShoppingCartDiscount } from "react-icons/tb";

const NextOrderReward = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: nextOrderRewards, isLoading } = NextOrderRewardHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = nextOrderRewards?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<CouponsFilter />}
      headerProps={{
        title: "لیست خریدهای بعدی",
        icon: <TbShoppingCartDiscount className="text-2xl" />,
        children: <NextOrderRewardListModal />,
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={nextOrderRewards?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default NextOrderReward;
