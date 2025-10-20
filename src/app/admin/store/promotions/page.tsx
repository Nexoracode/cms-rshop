"use client";

import BackToPage from "@/components/widgets/BackToPage";
import { useDisclosure } from "@heroui/react";
import PromotionsListModal from "@/components/admin/_store/__promotions/PromotionsListModal";
import CardContent from "@/components/admin/CardContent";
import { GrAnnounce } from "react-icons/gr";
import { useGetBrands } from "@/hooks/api/useBrand";

const Promotions = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: brands, isLoading } = useGetBrands();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="mb-4">
          <BackToPage title="برگشت به تنظیمات" link="/admin/store" />
        </div>

        <section className="flex flex-col gap-6">
          <CardContent
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
                return (
                  <div key={b.id}>

                  </div>
                );
              })}
            </div>
          </CardContent>
        </section>
      </div>
      <PromotionsListModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Promotions;
