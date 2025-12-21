"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import TemplateSliders from "@/components/features/store/(main-pages)/TemplateSliders";
import { useGetHome } from "@/core/hooks/api/adminHome/useHome";
import { SiMaterialformkdocs } from "react-icons/si";

const HomeBuilder = () => {
  const { data, isLoading: isLoading } = useGetHome();

  const home = data?.data

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت صفحه اصلی",
        icon: <SiMaterialformkdocs className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={true}
      searchInp={false}
    >
      <TemplateSliders
        sliders={home?.hero_sliders}
        sideBanners={home?.side_banners}
        categories={home?.categories}
        brands={home?.brands}
        sections={home?.sections}
      />
    </UnifiedCard>
  );
};

export default HomeBuilder;
