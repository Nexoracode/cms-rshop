"use client";

import { useEffect, useState } from "react";
import SectionTemplate from "../../SectionTemplate";
import Slider from "@/components/shared/Slider";
import ProductTemplate from "../../../ProductTemplate";
import SectionTemplateHeader from "../../SectionTemplateHeader";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import CtegorySectionModal from "./CtegorySectionModal";

type CategorySectionProps = {
  categories: any[];
};

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  console.log(categories[activeSlider]?.products);

  return (
    <div className="hover-reveal-parent">
      <CtegorySectionModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={categories[activeSlider]}
      />

      <div className="flex flex-col gap-2">
        <SectionTemplateHeader
          title={"خرید براساس دسته بندی"}
          showViewAll={categories[activeSlider]?.show_view_all_button}
          viewAllLink={categories[activeSlider]?.view_all_link}
        >
          <ActionButton
            icon={<TbEdit className="text-gray-700" size={18} />}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </SectionTemplateHeader>

        <div className="w-full flex items-center gap-8">
          <div className="!w-[300px] min-h-[252px] h-full flex flex-col justify-center gap-2 shadow-md border border-gray-200 rounded-xl p-4 overflow-y-auto">
            {categories?.map((cat: any, index: number) => {
              const { name } = cat.category;

              return (
                <div
                  key={index}
                  className={`cursor-pointer flex items-center text-gray-700 ${
                    categories.length - 1 !== index ? " border-b" : ""
                  }`}
                  onClick={() => setActiveSlider(index)}
                >
                  <p
                    className={`${
                      activeSlider === index ? "bg-slate-100" : ""
                    } truncate p-2 rounded-lg hover:bg-slate-100 transition-all w-full mb-2`}
                  >
                    {name}
                  </p>
                </div>
              );
            })}
          </div>

          <Slider
            items={categories[activeSlider]?.products}
            itemsPerView={3}
            rows={1}
            rowHeight={250}
            renderItem={(product: any) => (
              <ProductTemplate key={product.id} product={product} />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
