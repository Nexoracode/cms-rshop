"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { LuGift } from "react-icons/lu";

const Gift = () => {
  const searchParams = useSearchParams();
  const giftId = searchParams.get("id");

  const { data: gift, isLoading } = useGetOneOrder(
    giftId ? +giftId : undefined
  );

  const giftData = gift?.data;
  console.log(giftData);

  return (
    <UnifiedCard
      isLoading={isLoading}
      isExistItems={!!giftData}
      searchInp={false}
      headerProps={{
        title: "مشخصات بسته بندی",
        icon: <LuGift className="text-2xl" />,
      }}
    ></UnifiedCard>
  );
};

export default Gift;
