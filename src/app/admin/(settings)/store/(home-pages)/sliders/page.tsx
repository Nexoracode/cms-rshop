"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import TemplateSliders from "@/components/features/store/(home-pages)/sliders/TemplateSliders";
import { useGetSideBanners } from "@/core/hooks/api/adminHome/useSideBanners";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

const Sliders = () => {
  const { data: sideBanners, isLoading: isLoadingSideBanners } =
    useGetSideBanners();
  const { data: sliders, isLoading: isLoadingSliders } = useGetSideBanners();

  console.log(sideBanners?.data);
  console.log(sliders?.data);

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت اسلایدرها",
        icon: <TfiLayoutSliderAlt className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoadingSideBanners || isLoadingSliders}
      isExistItems={true}
      searchInp={false}
      childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    >
      <TemplateSliders
        sideBanners={sideBanners?.data}
        sliders={sliders?.data}
      />
    </UnifiedCard>
  );
};

export default Sliders;
