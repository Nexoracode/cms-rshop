import Slider from "@/components/shared/Slider";
import HeroTemplate from "./HeroTemplate";
import { HeroSlider } from "./hero-slider.types";
import HeroSliderEmptyState from "./HeroSliderEmptyState";

type Props = {
  sliders?: HeroSlider[];
  layoutType?: string
};

const HeroSliderContainer: React.FC<Props> = ({ sliders = [], layoutType }) => {
  const sortedSliders = [...sliders].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <div className="w-full rounded-2xl overflow-hidden">
      {sortedSliders.length ? (
        <Slider
          items={sortedSliders}
          className="w-full"
          renderItem={(slider) => (
            <HeroTemplate key={slider.id} slider={slider} sliders={sortedSliders} className={layoutType === "stacked" ? "!relative h-72 w-full" : ""}/>
          )}
        />
      ) : (
        <HeroSliderEmptyState />
      )}
    </div>
  );
};

export default HeroSliderContainer;
