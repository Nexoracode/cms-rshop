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
        itemsPerView={5}
        rows={2}
        parentStyle="w-fit gap-12 mx-auto"
        rowHeight={160}
        renderItem={(category) => (
          <CategoryTemplate category={category} />
        )}
      />
    </div>
  );
};

export default CategoriesSliderContainer;
