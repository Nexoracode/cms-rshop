import Slider from "@/components/shared/Slider";
import BrandTemplate from "./BrandTemplate";

type Props = {
  brands?: any[];
};

const BrandsSliderContainer: React.FC<Props> = ({ brands = [] }) => {
  return (
    <div className="w-full">
      <Slider
        items={brands}
        itemsPerView={6}
        parentStyle="w-fit gap-12 mx-auto"
        renderItem={(brand) => (
          <BrandTemplate brand={brand} />
        )}
      />
    </div>
  );
};

export default BrandsSliderContainer;
