"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import { TbFolderQuestion } from "react-icons/tb";
import FaqCatCard from "@/components/features/store/store-page/faqs-cat/FaqCatCard";
import { useGetFaqCategories } from "@/core/hooks/api/faq/useFaqCat";
import { IconsSelectionProvider } from "@/components/features/store/icons/SelectableIconBox/IconsSelectionContext";
import FaqCatFormModal from "@/components/features/store/store-page/faqs-cat/FaqCatFormModal";

const FaqsPage = () => {
  const { data: catFaqs, isLoading } = useGetFaqCategories();

  console.log(catFaqs);
  

  const isExistItems = !!catFaqs?.data?.length;

  const [editIcon, setEditIcon] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditIcon = (faqcat: any) => {
    setEditIcon(faqcat);
    setIsEditOpen(true);
  };

  return (
    <>
      <IconsSelectionProvider initialIcons={editIcon?.icon} singleSelect>
        <FaqCatFormModal
          iconId={editIcon?.id || 1}
          defaultValues={editIcon}
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      </IconsSelectionProvider>

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
            children: (
              <IconsSelectionProvider singleSelect>
                <FaqCatFormModal />
              </IconsSelectionProvider>
            ),
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 !gap-2"
        >
          {catFaqs?.data?.map((cat: any) => (
            <FaqCatCard key={cat.id} data={cat} onEdit={handleEditIcon} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default FaqsPage;
