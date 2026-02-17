"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import IconCard from "@/components/features/store/icons/IconCard";
import IconFormModal from "@/components/features/store/icons/IconFormModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import { useGetIcons } from "@/core/hooks/api/useIcon";
import { LuMessageCircleQuestion } from "react-icons/lu";

const FaqsPage = () => {
  const { page, search, isFilteredView } = useListQueryParams();

  const { data: icons, isLoading } = useGetIcons({
    page,
    search,
  });

  const isExistItems = !!icons?.data?.items?.length;

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
                  href: "/admin/orders/payment-log",
                },
                {
                  title: "دسته بندی سوالات",
                  href: "/admin/store/store-pages/faqs/categories",
                },
              ]}
            />
          }
          headerProps={{
            title: "مدیریت سؤالات",
            icon: <LuMessageCircleQuestion className="text-2xl" />,
            children: <IconFormModal />,
            tooltipTitle: "راهنمای سوالات متداول",
            tooltipDescription: `در این بخش می‌توانید سوالات متداول (FAQ) فروشگاه را مدیریت کنید.

📂 مرحله اول: ایجاد دسته‌بندی
قبل از افزودن هر سوال، باید یک دسته‌بندی برای آن ایجاد کنید. هر سوال متداول داخل یک دسته‌بندی قرار می‌گیرد.

➕ افزودن سوال جدید:
بعد از ساخت دسته‌بندی، می‌توانید سوال و پاسخ مربوط به آن را اضافه کنید.

✏️ مدیریت:
روی هر آیتم کلیک کنید ◄ ویرایش
در صورت نیاز ◄ حذف سوال یا دسته‌بندی

🔎 جستجو:
از کادر جستجو برای پیدا کردن سریع سوالات استفاده کنید.

🎯 کاربرد:
این سوالات در سایت نمایش داده می‌شوند و به کاربران کمک می‌کنند سریع‌تر پاسخ خود را پیدا کنند.`,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={icons?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 !gap-2"
        >
          {icons?.data?.items?.map((b: any) => (
            <IconCard key={b.id} icon={b} onEdit={handleEditIcon} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default FaqsPage;
