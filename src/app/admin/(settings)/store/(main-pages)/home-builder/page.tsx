"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import TemplateSliders from "@/components/features/store/(main-pages)/TemplateSliders";
import { useGetHeroSliders } from "@/core/hooks/api/adminHome/useHeroSlider";
import { useGetSideBanners } from "@/core/hooks/api/adminHome/useSideBanners";
import { SiMaterialformkdocs } from "react-icons/si";

const HomeBuilder = () => {
  const { data: sideBanners, isLoading: isLoadingSideBanners } =
    useGetSideBanners();
  const { data: sliders, isLoading: isLoadingSliders } = useGetHeroSliders();

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت صفحه اصلی",
        icon: <SiMaterialformkdocs className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoadingSideBanners || isLoadingSliders}
      isExistItems={true}
      searchInp={false}
    >
      <TemplateSliders
        sideBanners={sideBanners?.data}
        sliders={sliders?.data}
      />
    </UnifiedCard>
  );
};

export default HomeBuilder;
