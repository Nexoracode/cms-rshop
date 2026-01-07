"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CollectionCard from "@/components/features/store/(main-pages)/collections/CollectionCard";
import { useGetCollections } from "@/core/hooks/api/adminHome/useCollections";
import { HiOutlineCollection } from "react-icons/hi";

const HomeBuilder = () => {
  const { data: collections, isLoading: isLoading } = useGetCollections();

  const isExistItems = collections?.data?.length;

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت مجموعه ها",
        icon: <HiOutlineCollection className="text-2xl" />,
        textBtn: "+ افزودن",
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={false}
      childrenClassName="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
    >
      {collections?.data?.map((coll: any) => (
        <CollectionCard collection={coll} onEdit={() => {}} />
      ))}
    </UnifiedCard>
  );
};

export default HomeBuilder;
