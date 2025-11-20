"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CouponsFilter from "@/components/features/store/promotions/coupon/Filter/CouponsFilter";
import { FirstOrderHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { FirstOrderListModal } from "@/components/features/store/promotions/first-order/FirstOrderListModal";
import { TfiShoppingCartFull } from "react-icons/tfi";

const firstOrder = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: firstOrders, isLoading } = FirstOrderHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = firstOrders?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<CouponsFilter />}
      headerProps={{
        title: "لیست تخفیف‌های خرید اول",
        icon: <TfiShoppingCartFull className="text-2xl" />,
        children: <FirstOrderListModal />,
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={firstOrders?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default firstOrder;
