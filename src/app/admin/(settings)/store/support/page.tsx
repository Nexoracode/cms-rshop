"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import SupportFilter from "@/components/features/store/support/Filter/SupportFilter";
import {
  SupportSortBy,
  useGetSupportList,
} from "@/core/hooks/api/support/useSupport";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
// Icons
import { MdOutlineSupportAgent } from "react-icons/md";
import ConversationList from "@/components/features/store/support/ConversationList";

const Products = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<SupportSortBy[number]>();

  const { data: support, isLoading } = useGetSupportList({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!support?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<SupportFilter />}
      headerProps={{
        title: "گفت و گوها",
        icon: <MdOutlineSupportAgent className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={support?.data?.meta}
    >
      <ConversationList conversations={support?.data?.items} />
    </UnifiedCard>
  );
};

export default Products;
