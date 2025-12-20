"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useGetSideBanners } from "@/core/hooks/api/adminHome/useSideBanners";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

const Sliders = () => {
  const { data: sideBanners, isLoading } = useGetSideBanners();

  return (
    <UnifiedCard
      headerProps={{
        title: "مدیریت اسلایدرها",
        icon: <TfiLayoutSliderAlt className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      isExistItems={true}
      searchInp={false}
      childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    ></UnifiedCard>
  );
};

export default Sliders;
