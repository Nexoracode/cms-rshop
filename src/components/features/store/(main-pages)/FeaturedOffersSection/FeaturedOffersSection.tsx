"use client";

import Slider from "@/components/shared/Slider";
import ProductTemplate from "../products/ProductTemplate";
import AmazingOfferCard from "./AmazingOfferCard";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";

type SectionIsFeaturedProps = {
  featuredSection?: any;
};

const FeaturedOffersSection: React.FC<SectionIsFeaturedProps> = ({
  featuredSection,
}) => {
  console.log("featuredSection =>", featuredSection);

  return (
    <div className="w-full hover-reveal-parent bg-[#E5344E] h-[294px] rounded-xl flex items-center justify-center p-4">
      <AmazingOfferCard />

      <div className="hover-reveal-child">
        <ActionButton
          icon={<TbEdit className="text-gray-700" size={18}/>}
          route="/admin/products"
        />
      </div>

      <Slider
        items={featuredSection?.products || []}
        itemsPerView={6}
        className="w-fit !gap-1.5 mx-auto"
        renderItem={(product: any) => <ProductTemplate product={product} />}
      />
    </div>
  );
};

export default FeaturedOffersSection;
