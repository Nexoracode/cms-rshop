"use client"

import OptionButton from "@/components/ui/buttons/OptionButton";
import AddSectionCard from "../../../shared/AddSectionCard";
import StaticSectionModal from "../StaticSectionModal";
import { LuPercent } from "react-icons/lu";

const AddFeaturedOfferSection = () => {
  return (
    <AddSectionCard
      className="h-[294px] !border-white !bg-[#E5344E]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/images/AmazingText.png"
            alt="AmazingText"
            className="w-[120px]"
          />
          {/* <div className="flex items-center gap-4">
            <OptionButton
              title="محصولات"
              href="/admin/store/promotions/flash-deal/products"
              className="text-white"
            />
            <OptionButton
              title="دسته‌بندی‌ها"
              href="/admin/store/promotions/flash-deal/categories"
              className="text-white"
            />
          </div> */}
          <div>
            <StaticSectionModal title="شگفت انگیز" icon={<LuPercent />} sectionType={"featured"} />
          </div>
        </div>
      }
    />
  );
};

export default AddFeaturedOfferSection;
