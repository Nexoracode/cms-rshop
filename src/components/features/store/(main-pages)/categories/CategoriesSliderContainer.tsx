"use client";

import Slider from "@/components/shared/Slider";
import CategorySlidersTemplate from "./CategorySliderTemplate";

type Props = {
  categories?: any[];
};

const CategoriesSliderContainer: React.FC<Props> = ({ categories = [] }) => {

  function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];

    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  }

  const groupedCategories = chunkArray(categories, 2);

  console.log(groupedCategories);
  

  return (
    <div className="w-full h-[320px]">
      <Slider
        items={groupedCategories}
        itemsPerView={5}
        renderItem={(categoryGroup, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 h-full">
            {categoryGroup.map((category) => (
              <CategorySlidersTemplate key={category.id} category={category} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default CategoriesSliderContainer;
