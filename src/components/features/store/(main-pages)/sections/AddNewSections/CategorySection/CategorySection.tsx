"use client";

import { useEffect, useState } from "react";
import SectionTemplate from "../../SectionTemplate";

type CategorySectionProps = {
  categories: any[];
};

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const [activeSlider, setActiveSlider] = useState(0);

  console.log(categories[activeSlider]?.products );

  return (
    <div className="w-full flex items-center gap-8">
      <div className="!w-[300px] min-h-[252px] h-full flex flex-col justify-center gap-2 shadow-md border border-gray-200 rounded-xl p-4 overflow-y-auto">
        {categories?.map((cat: any, index: number) => {
          const { name } = cat.category;
          
          return (
            <div key={index} className={`cursor-pointer flex items-center text-gray-700 ${categories.length - 1 !== index ? " border-b" : ""}`} onClick={() => setActiveSlider(index)}>
              <p className={`${activeSlider === index ? "bg-slate-100" : ""} truncate p-2 rounded-lg hover:bg-slate-100 transition-all w-full mb-2`}>{name}</p>
            </div>
          );
        })}
      </div>

      <SectionTemplate title="خرید براساس دسته بندی" section={categories[activeSlider] || []} />
    </div>
  );
};

export default CategorySection;
