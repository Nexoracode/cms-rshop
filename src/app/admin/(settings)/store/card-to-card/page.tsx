"use client"

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { ProductSortBy } from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useGetGiftWrappings } from "@/core/hooks/api/useGiftWrapping";
// Icons
import GiftWrappingCard from "@/components/features/store/gift-wrapping/GiftWrappingCard";
import { IoCardOutline } from "react-icons/io5";
import CardNumbersFilter from "@/components/features/store/card-to-card/Filter/CardNumbersFilter";

const CardToCard = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: gifts, isLoading } = useGetGiftWrappings({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!gifts?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<CardNumbersFilter />}
      headerProps={{
        title: "کارت به کارت",
        icon: <IoCardOutline className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={gifts?.data?.meta}
      childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    >
      {gifts?.data?.items?.map((gift: any) => (
        <GiftWrappingCard key={gift.id} gift={gift} />
      ))}
    </UnifiedCard>
  );
};

export default CardToCard;
