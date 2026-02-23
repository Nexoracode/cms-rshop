"use client";

import ConversationDetail from "@/components/features/store/support/ConversationDetail";
import ConversationList from "@/components/features/store/support/ConversationList";
import EmptyStateCard from "@/components/feedback/EmptyStateCard";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import {
  SupportSortBy,
  useGetSupportList,
} from "@/core/hooks/api/support/useSupport";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import ScrollPagination from "@/core/hooks/system/InfiniteScrollPagination";
import { useRef } from "react";

const ChatPage = () => {
  const { page, sortBy, search, filter } =
    useListQueryParams<SupportSortBy[number]>();
  const listRef = useRef<HTMLDivElement | null>(null);

  const { data: support, isLoading } = useGetSupportList({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!support?.data?.items?.length;

  if (isLoading) {
    return <LoadingApiCall />;
  }

  if (!isExistItems && !isLoading) {
    return <EmptyStateCard />;
  }

  return (
    <>
      <div className="flex flex-row gap-2 bg-white h-[100vh] py-6 px-2">
        <ConversationList 
          conversations={support?.data?.items} 
          containerRef={listRef}
          className="overflow-y-auto"
        />
        <ConversationDetail showBackBtn />
      </div>
      <ScrollPagination
        containerRef={listRef}
        currentPage={support?.data?.meta.current_page || 1}
        totalPages={support?.data?.meta.total_pages || 1}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatPage;