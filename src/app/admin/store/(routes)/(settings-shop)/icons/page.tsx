"use client";

import { useState } from "react";
import BrandCard from "@/components/features/products/brands/BrandCard";
import BrandFilters from "@/components/features/products/brands/BrandFilters";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { BrandSortBy, useGetBrands } from "@/core/hooks/api/useBrand";
import { TbBrandArc, TbIcons } from "react-icons/tb";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import AddNewBrandModal from "@/components/features/products/brands/AddNewBrandModal";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const IconsPage = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<BrandSortBy[number]>();

  const { data: brands, isLoading } = useGetBrands({
    page,
    search,
    sortBy,
  });

  const isExistItems = !!brands?.data?.items?.length;

  const [editBrand, setEditBrand] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditBrand = (brand: any) => {
    setEditBrand(brand);
    setIsEditOpen(true);
  };

  return (
    <>
      <AddNewBrandModal
        brandId={editBrand?.id || 1}
        defaultValues={editBrand}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <UnifiedCard
          searchFilter={<BrandFilters />}
          headerProps={{
            title: "مدیریت آیکون ها",
            icon: <TbIcons className="text-2xl" />,
            children: <AddNewBrandModal />,
            tooltipTitle: "راهنمای آیکون ها",
            tooltipDescription: `🎨 مدیریت آیکون‌ها
اینجا همه چیز رو برای آیکون‌های سایتت تنظیم می‌کنی! هم می‌تونی از آیکون‌های آماده SVG که از قبل هست استفاده کنی، هم آیکون‌های مخصوص خودتو اضافه کنی.

➕ افزودن آیکون جدید:
وقتی دکمه "افزودن آیکون" رو می‌زنی، یادت باشه حتماً فایل SVG آیکونت رو آپلود کنی.

✏️ مدیریت:
کلیک روی هر باکس آیکون ◄ ویرایشش کن
سطل زباله ◄ اگه دیگه لازم نداری، پاکش کن

🔍 سرچ بالای صفحه:
با اون کادر جستجو می‌تونی خیلی راحت بین آیکون‌ها دنبال یه آیکون خاص بگردی.

🎯 استفاده نهایی:
این آیکون‌ها قراره توی بخش‌های مختلف سایت مثل دسته‌بندی‌ها استفاده بشن.

💡 یه نکته مهم برای طراحا:
اگه آیکون SVG مورد نظرتو نداری، نگران نباش! می‌تونی از این سایت‌های معروف دانلود کنی:
🔹 FontAwesome (https://fontawesome.com)
🔹 Feather Icons (https://feathericons.com)
🔹 Heroicons (https://heroicons.com)
🔹 Tabler Icons (https://tabler-icons.io)

❗ فقط یادت باشه:
بعضی از این سایت‌ها ممکنه تحریم باشن و برای دسترسی بهشون باید VPN داشته باشی.`,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={brands?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          {brands?.data?.items?.map((b: any) => (
            <BrandCard key={b.id} brand={b} onEdit={handleEditBrand} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default IconsPage;
