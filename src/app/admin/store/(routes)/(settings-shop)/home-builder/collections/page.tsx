"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CollectionCard from "@/components/features/store/(main-pages)/collections/CollectionCard";
import { useGetHomeSections } from "@/core/hooks/api/adminHome/useHomeSections";
import { HiOutlineCollection } from "react-icons/hi";

const Collections = () => {
  const { data: collections, isLoading: isLoading } = useGetHomeSections();
  
  const sections  = collections?.data?.filter((coll:any) => coll.section_type !== "promotion_based")

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت مجموعه ها",
        icon: <HiOutlineCollection className="text-2xl" />,
        redirect: "/admin/store/home-builder/collections/create"
      }}
      isLoading={isLoading}
      isExistItems={sections?.length}
      searchInp={false}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2"
    >
      {sections?.map((coll: any, index: number) => (
        <CollectionCard key={index} collection={coll}/>
      ))}
    </UnifiedCard>
  );
};

export default Collections;
