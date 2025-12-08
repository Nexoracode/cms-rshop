"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { ProductSortBy } from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useGetGiftWrappings } from "@/core/hooks/api/gift/useGift";
// Icons
import { LuGift, LuPlus } from "react-icons/lu";
import GiftCard from "@/components/features/store/gift/GiftCard";
import GiftsFilter from "@/components/features/store/gift/Filter/GiftsFilter";

const giftWrapping = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: gifts, isLoading } = useGetGiftWrappings({
    page,
    filter,
    search,
    sortBy,
  });
  console.log(gifts);
  
  const isExistItems = !!gifts?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<GiftsFilter />}
      headerProps={{
        title: "مدیریت بسته بندی ها",
        icon: <LuGift className="text-2xl" />,
        redirect: "/admin/store/create?type=infos",
        btnIcon: <LuPlus />,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={gifts?.data?.meta}
      childrenClassName="grid md:grid-cols-2"
    >
      {gifts?.data?.items?.map((gift: any) => (
        <GiftCard gift={gift} />
      ))}
    </UnifiedCard>
  );
};

export default giftWrapping;
