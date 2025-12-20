"use client";

import React from "react";

type TemplateSlidersProps = {
  sideBanners?: any;
  sliders?: any;
};

const TemplateSliders: React.FC<TemplateSlidersProps> = ({
  sideBanners,
  sliders,
}) => {
  return (
    <div>
      <div>{sideBanners}</div>

      <div>
        {sliders?.map((slider: any) => (
          <div key={slider.id}>{slider.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSliders;
