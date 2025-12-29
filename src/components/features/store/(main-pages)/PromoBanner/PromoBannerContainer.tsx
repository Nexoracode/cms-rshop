"use client";

import Slider from "@/components/shared/Slider";
import PromoBannerTemplate from "./PromoBannerTemplate";
import PromoBannerEmptyState from "./PromoBannerEmptyState";

type PromoBannerContainer = {
  promoBnners: any;
};

const PromoBannerContainer: React.FC<PromoBannerContainer> = ({
  promoBnners,
}) => {
  return (
    <div>
      {promoBnners.length ? (
        <Slider
          items={promoBnners}
          itemsPerView={1}
          renderItem={(banner: any) => <PromoBannerTemplate banner={banner} />}
        />
      ) : (
        <PromoBannerEmptyState />
      )}
    </div>
  );
};

export default PromoBannerContainer;
