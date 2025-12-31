"use client";

import Slider from "@/components/shared/Slider";
import ProductTemplate from "../../../ProductTemplate";
import AmazingOfferCard from "./AmazingOfferCard";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import AddFeaturedOfferSection from "./AddFeaturedOfferSection";
import { useState } from "react";
import { LuPercent } from "react-icons/lu";
import StaticSectionModal from "../StaticSectionModal";

type SectionIsFeaturedProps = {
  featuredSection?: any;
};

const FeaturedOffersSection: React.FC<SectionIsFeaturedProps> = ({
  featuredSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {featuredSection ? (
        <div className="w-full hover-reveal-parent bg-[#E5344E] h-[294px] rounded-xl flex items-center justify-center p-4">
          <AmazingOfferCard />
          <StaticSectionModal
            title="دسته بندی"
            icon={<LuPercent />}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            defaultValues={featuredSection}
          />

          <div className="hover-reveal-child">
            <ActionButton
              icon={<TbEdit className="text-gray-700" size={18} />}
              onClick={() => setIsOpen(true)}
            />
          </div>
          <Slider
            items={featuredSection?.products || []}
            itemsPerView={3}
            className="w-fit !gap-1.5 mx-auto"
            renderItem={(product: any) => <ProductTemplate product={product} />}
          />
        </div>
      ) : (
        <AddFeaturedOfferSection />
      )}
    </div>
  );
};

export default FeaturedOffersSection;
