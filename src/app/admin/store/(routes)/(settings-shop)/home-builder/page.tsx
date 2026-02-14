"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import HomeBuilderFilter from "@/components/features/store/(main-pages)/HomeBuilderFilter";
import TemplateSliders from "@/components/features/store/(main-pages)/TemplateSliders";
import { useGetHome } from "@/core/hooks/api/adminHome/useHome";
import { SiMaterialformkdocs } from "react-icons/si";

const HomeBuilder = () => {
  const { data, isLoading: isLoading } = useGetHome();

  const home = data?.data;

  return (
    <UnifiedCard
      searchFilter={<HomeBuilderFilter />}
      headerProps={{
        title: "مدیریت صفحه اصلی",
        icon: <SiMaterialformkdocs className="text-2xl" />,
        tooltipTitle: "راهنمای صفحه‌ساز",
        tooltipDescription:
          "در این بخش می‌توانید چیدمان و محتوای صفحه اصلی فروشگاه را به صورت کاملاً بصری و بدون نیاز به کدنویسی طراحی کنید. با استفاده از ابزارهای موجود، المان‌های مختلف را به صفحه اضافه، جابجا یا حذف کنید.",
      }}
      isLoading={isLoading}
      isExistItems={true}
      searchInp={false}
    >
      <TemplateSliders allSections={home} />
    </UnifiedCard>
  );
};

export default HomeBuilder;
