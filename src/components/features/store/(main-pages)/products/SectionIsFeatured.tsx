"use client";


import Slider from "@/components/shared/Slider";
import ProductTemplate from "./ProductTemplate";
import { IoIosArrowBack } from "react-icons/io";

type SectionIsFeaturedProps = {
  featuredSection?: any;
};

const SectionIsFeatured: React.FC<SectionIsFeaturedProps> = ({
  featuredSection,
}) => {
  console.log("featuredSection =>", featuredSection);

  return (
    <div className="w-full bg-[#D52E4E] h-[294px] rounded-xl flex items-center justify-center p-4">
      
      <div className="h-[254px] w-[160px] flex flex-col items-center justify-center ml-6">
        <img src="/images/AmazingText.png" alt="AmazingText" className="w-[88px]"/>
        <div className="w-full h-100 mt-4 mb-2 flex items-center justify-center">
          <p className="bg-gray-100 w-fit px-2 rounded-lg">32 : 04 : 12</p>
        </div>
        <img src="/images/Amazing.png" alt="AmazingText" className="w-[80px]"/>
        <div className="flex items-center gap-1 mt-4 text-white">
          <p>مشاهده همه</p>
          <IoIosArrowBack />
        </div>
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

export default SectionIsFeatured;
