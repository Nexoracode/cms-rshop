"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import IconFormModal from "@/components/features/store/icons/IconFormModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import { useGetStoreCatFaqs } from "@/core/hooks/api/useFaq";
import { TbFolderQuestion } from "react-icons/tb";
import FaqCatCard from "@/components/features/store/store-page/faqs/FaqCatCard";

const FaqsPage = () => {
  const { data: catFaqs, isLoading } = useGetStoreCatFaqs();

  const isExistItems = !!catFaqs?.data?.length;

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
              relatedPages={[
                {
                  title: "آیکون ها",
                  href: "/admin/store/icons",
                },
              ]}
            />
          }
          headerProps={{
            title: "مدیریت دسته بندی سوالات",
            icon: <TbFolderQuestion className="text-2xl" />,
            children: <IconFormModal />,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 !gap-2"
        >
          {catFaqs?.data?.map((cat: any) => (
            <FaqCatCard
              key={cat.id}
              data={cat}
              onEdit={handleEditIcon}
            />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default FaqsPage;
