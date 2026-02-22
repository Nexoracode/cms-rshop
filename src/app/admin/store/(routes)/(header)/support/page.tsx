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
import { TfiFullscreen } from "react-icons/tfi";

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
        className: "p-2 mb-4",
        btnIcon: <TfiFullscreen size={16} />,
        textBtn: "تمام صفحه",
        redirect: "/chat",
        tooltipTitle: "پشتیبانی کاربران",
        tooltipDescription:
          "در این بخش می‌توانید با کاربران و کاربران فروشگاه ارتباط برقرار کنید، درخواست‌ها و مشکلات آن‌ها را مشاهده و پاسخ دهید. با دکمه 'تمام صفحه' می‌توانید محیط چت را در حالت فول‌اسکرین باز کرده و تجربه مدیریت راحت‌تری داشته باشید.",
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
