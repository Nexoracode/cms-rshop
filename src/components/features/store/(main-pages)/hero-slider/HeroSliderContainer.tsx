import Slider from "@/components/shared/Slider";
import HeroSlidersTemplate from "./HeroSlidersTemplate";
import { HeroSlider } from "./hero-slider.types";

type Props = {
  sliders?: HeroSlider[];
};

const HeroSliderContainer: React.FC<Props> = ({ sliders = [] }) => {
  const sortedSliders = [...sliders].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <div className="w-full h-[320px] rounded-2xl overflow-hidden">
      <Slider
        items={sortedSliders}
        renderItem={(slider) => (
          <HeroSlidersTemplate key={slider.id} slider={slider} />
        )}
      />
    </div>
  );
};

export default HeroSliderContainer;
