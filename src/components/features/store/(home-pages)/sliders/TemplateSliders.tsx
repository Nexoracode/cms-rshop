"use client";

import React from "react";
import SideBannersTemplate from "./SideBannersTemplate";
import { SideBanner } from "./sliders.types";

type TemplateSlidersProps = {
  sideBanners?: any;
  sliders?: any;
};

const TemplateSliders: React.FC<TemplateSlidersProps> = ({
  sideBanners,
  sliders,
}) => {
  console.log("sideBanners =>", sideBanners);
  console.log("Slider =>", sliders);

  return (
    <div className="grid grid-cols-2 py-14">
      <div>
        {sliders?.map((slider: any) => (
          <div key={slider.id}>{slider.title}</div>
        ))}
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {sideBanners.map((banner: SideBanner) => (
          <SideBannersTemplate key={banner.id} banner={banner} />
        ))}
      </div>
    </div>
  );
};

export default TemplateSliders;
