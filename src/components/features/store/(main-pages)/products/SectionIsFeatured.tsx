"use client";

import { Slider } from "@heroui/react";
import ProductTemplate from "./ProductTemplate";

type SectionIsFeaturedProps = {
  featuredSection?: any;
};

const SectionIsFeatured: React.FC<SectionIsFeaturedProps> = ({
  featuredSection,
}) => {
  console.log("featuredSection =>", featuredSection);

  return (
    <div className="w-full">
      <Slider
        items={featuredSection?.products || []}
        itemsPerView={6}
        className="w-fit gap-12 mx-auto"
        renderItem={(product) => <ProductTemplate product={product} />}
      />
    </div>
  );
};

export default SectionIsFeatured;
