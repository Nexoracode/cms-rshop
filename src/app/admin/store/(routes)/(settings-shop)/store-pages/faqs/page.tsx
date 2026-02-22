"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import IconCard from "@/components/features/store/icons/IconCard";
import IconFormModal from "@/components/features/store/icons/IconFormModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useGetStoreFaqs } from "@/core/hooks/api/useFaq";

const FaqsPage = () => {
  const { page, isFilteredView } = useListQueryParams();

  const { data: faqs, isLoading } = useGetStoreFaqs({ page });

  const isExistItems = !!faqs?.data?.items?.length;

  const [editIcon, setEditIcon] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditIcon = (brand: any) => {
    setEditIcon(brand);
    setIsEditOpen(true);
  };

  return (
    <>
      <IconFormModal
        iconId={editIcon?.id || 1}
        defaultValues={editIcon}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <UnifiedCard
          searchFilter={
            <SearchFilterCard
              searchPlaceholder="جستجو در سوالات..."
              showSearchBar
              relatedPages={[
                {
                  title: "آیکون ها",
                  href: "/admin/store/icons",
                },
                {
                  title: "دسته بندی سوالات",
                  href: "/admin/store/store-pages/faqs/cates",
                },
              ]}
            />
          }
          headerProps={{
            title: "مدیریت سؤالات",
            icon: <LuMessageCircleQuestion className="text-2xl" />,
            children: <IconFormModal />  
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={faqs?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 !gap-2"
        >
          {/* {faqs?.data?.items?.map((b: any) => (
            
          ))} */}
        </UnifiedCard>
      </div>
    </>
  );
};

export default FaqsPage;
