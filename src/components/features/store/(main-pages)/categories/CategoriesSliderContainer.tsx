import Slider from "@/components/shared/Slider";
import CategoryTemplate from "./CategoryTemplate";

type Props = {
  categories?: any[];
};

const CategoriesSliderContainer: React.FC<Props> = ({ categories = [] }) => {
  return (
    <div className="w-full">
      <Slider
        items={categories}
        itemsPerView={6}
        rows={2}
        className="w-fit gap-12 mx-auto"
        childClassName="!h-fit"
        rowHeight={160}
        renderItem={(category) => (
          <CategoryTemplate category={category} />
        )}
      />
    </div>
  );
};

export default CategoriesSliderContainer;
