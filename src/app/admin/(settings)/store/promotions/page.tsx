"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { GrAnnounce } from "react-icons/gr";
import PromotionsListModal from "@/components/features/store/promotions/PromotionsListModal";

const Promotions = () => {

  const items: any = [];
  const hasItems = items.length > 0;
  const isLoading = false

  return (
    <UnifiedCard
      headerProps={{
        title: "لیست پروموشن ها",
        icon: <GrAnnounce className="text-2xl" />,
        children: <PromotionsListModal />,
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={false}
      childrenClassName="flex flex-wrap justify-center pr-2 gap-4"
    >
      {items.map((b: any) => (
        <div
          key={b.id}
          className="bg-gray-100 p-4 rounded-lg min-w-48 text-center text-sm text-gray-700"
        >
          {b.name || "بدون نام"}
        </div>
      ))}
    </UnifiedCard>
  );
};

export default Promotions;