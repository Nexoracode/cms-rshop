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

const ChatPage = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<SupportSortBy[number]>();

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

  if (!isExistItems) {
    <EmptyStateCard />;
  }

  return (
    <div className="flex flex-row gap-2 bg-white h-[100vh] py-6 px-2">
      <ConversationList conversations={support?.data?.items} />
      <ConversationDetail showBackBtn/>
    </div>
  );
};

export default ChatPage;
