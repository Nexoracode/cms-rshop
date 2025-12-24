import Slider from "@/components/shared/Slider";
import HeroTemplate from "./HeroTemplate";
import { HeroSlider } from "./hero-slider.types";
import HeroSliderEmptyState from "./HeroSliderEmptyState";

type Props = {
  sliders?: HeroSlider[];
};

const HeroSliderContainer: React.FC<Props> = ({ sliders = [] }) => {
  const sortedSliders = [...sliders].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  
  return (
    <div className="w-full h-[320px] rounded-2xl overflow-hidden">
      {sortedSliders.length ? (
        <Slider
          items={sortedSliders}
          renderItem={(slider) => (
            <HeroTemplate key={slider.id} slider={slider} />
          )}
        />
      ) : (
        <HeroSliderEmptyState />
      )}
    </div>
  );
};

export default HeroSliderContainer;
