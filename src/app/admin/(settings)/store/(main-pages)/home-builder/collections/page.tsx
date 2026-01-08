"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CollectionCard from "@/components/features/store/(main-pages)/collections/CollectionCard";
import { useGetCollections } from "@/core/hooks/api/adminHome/useCollections";
import { HiOutlineCollection } from "react-icons/hi";

const Collections = () => {
  const { data: collections, isLoading: isLoading } = useGetCollections();

  const isExistItems = collections?.data?.length;

  console.log(collections);
  

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت مجموعه ها",
        icon: <HiOutlineCollection className="text-2xl" />,
        redirect: "/admin/store/home-builder/collections/create"
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={false}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2"
    >
      {collections?.data?.map((coll: any, index: number) => (
        <CollectionCard key={index} collection={coll}/>
      ))}
    </UnifiedCard>
  );
};

export default Collections;
