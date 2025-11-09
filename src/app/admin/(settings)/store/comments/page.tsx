"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useGetReviews } from "@/core/hooks/api/useReview";
import ReviewCard from "@/components/features/store/comments/ReviewCard";
import { LuMessagesSquare } from "react-icons/lu";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { ReviewSortBy } from "@/components/features/store/comments/review-types";

const AdminReviews = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ReviewSortBy[number]>();
  const { data: reviews, isLoading } = useGetReviews({
    page,
    sortBy,
    search,
    filter,
  });

  const isExistItems = !!reviews?.data?.length;
  console.log(reviews);
  
  return (
    <UnifiedCard
      searchFilter={null}
      headerProps={{
        title: "لیست نظرات کاربران",
        icon: <LuMessagesSquare />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={reviews?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center md:justify-items-stretch"
    >
      {reviews?.data?.map((item: any) => (
        <ReviewCard key={item.id} item={item} />
      ))}
    </UnifiedCard>
  );
};

export default AdminReviews;
