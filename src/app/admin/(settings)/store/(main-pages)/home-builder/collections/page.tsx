"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useGetCollections } from "@/core/hooks/api/adminHome/useCollections";
import { HiOutlineCollection } from "react-icons/hi";

const HomeBuilder = () => {
  const { data: collections, isLoading: isLoading } = useGetCollections();

  console.log("collections", collections);

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت مجموعه ها",
        icon: <HiOutlineCollection className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={true}
      searchInp={false}
    >
      
    </UnifiedCard>
  );
};

export default HomeBuilder;
