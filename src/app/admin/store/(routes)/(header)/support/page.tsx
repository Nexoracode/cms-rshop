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
import ConversationDetail from "@/components/features/store/support/ConversationDetail";

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
        title: "پشتیبانی",
        icon: <MdOutlineSupportAgent className="text-2xl" />,
        showIconInActionSlot: true,
        className: "p-2 mb-4",
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={support?.data?.meta}
      bodyClassName="p-0"
    >
      <div className="flex flex-row gap-2">
        <ConversationList conversations={support?.data?.items} />
        <ConversationDetail />
      </div>
    </UnifiedCard>
  );
};

export default Products;
