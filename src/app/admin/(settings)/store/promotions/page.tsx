"use client";

import BackToPage from "@/components/shared/BackToPage";
import { useDisclosure } from "@heroui/react";
import PromotionsListModal from "@/components/admin/store/promotions/PromotionsListModal";
import EntityCard from "@/components/shared/EntityCard";
import { GrAnnounce } from "react-icons/gr";
import { useGetBrands } from "@/hooks/api/useBrand";

const Promotions = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: brands, isLoading } = useGetBrands();

  return (
    <>
      <BackToPage title="برگشت به تنظیمات" link="/admin/store" />

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
