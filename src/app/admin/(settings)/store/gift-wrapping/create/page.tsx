"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneGiftWrapping } from "@/core/hooks/api/useGiftWrapping";
import GiftWrappingForm from "@/components/features/store/gift-wrapping/GiftWrappingForm";

const GiftWrappingDetailPage = () => {
  const searchParams = useSearchParams();
  const giftId = searchParams.get("id");

  const { data: giftData, isLoading } = useGetOneGiftWrapping(
    giftId ? +giftId : undefined
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg">در حال بارگذاری اطلاعات...</span>
      </div>
    );
  }

  return (
    <GiftWrappingForm
      giftWrapping={giftData?.data}
    />
  );
};

export default GiftWrappingDetailPage;