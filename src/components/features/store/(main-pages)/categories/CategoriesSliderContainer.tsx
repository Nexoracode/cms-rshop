import Slider from "@/components/shared/Slider";
import CategoryTemplate from "./CategoryTemplate";
import AddCategorySection from "./AddCategorySection";

type Props = {
  categories?: any[];
};

const CategoriesSliderContainer: React.FC<Props> = ({ categories = [] }) => {
  return (
    <div className="w-full">
      {categories?.length ? (
        <div className="flex flex-col gap-10 justify-center items-center">
          <p className="text-lg text-gray-700">خرید بر اساس دسته‌بندی</p>
          <Slider
            items={categories}
            itemsPerView={6}
            rows={2}
            className="w-fit gap-12 mx-auto"
            childClassName="!h-fit"
            rowHeight={160}
            renderItem={(category) => <CategoryTemplate category={category} />}
          />
        </div>
      ) : (
        <AddCategorySection />
      )}
    </div>
  );
};

export default CategoriesSliderContainer;
