"use client";

import BackToPage from "@/components/common/Breadcrumbs";
import { useDisclosure } from "@heroui/react";
import PromotionsListModal from "@/components/features/store/promotions/PromotionsListModal";
import EntityCard from "@/components/common/EntityCard/EntityCard";
import { GrAnnounce } from "react-icons/gr";
import { useGetBrands } from "@/hooks/api/useBrand";

const Promotions = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: brands, isLoading } = useGetBrands();

  return (
    <>
      <EntityCard
        datas={brands}
        isExistItems={brands?.data?.items?.length}
        isLoading={isLoading}
        title="لیست پروموشن ها"
        onAdd={onOpen}
        icon={<GrAnnounce className="text-2xl" />}
        searchInp={false}
      >
        <div className="flex flex-wrap justify-center pr-2 gap-4">
          {brands?.data?.items?.map((b: any) => {
            return <div key={b.id}></div>;
          })}
        </div>
      </EntityCard>

      <PromotionsListModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Promotions;
