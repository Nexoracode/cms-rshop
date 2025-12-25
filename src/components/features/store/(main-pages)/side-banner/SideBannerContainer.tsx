import SideBannerEmptyState from "./SideBannerEmptyState";
import SideBannersTemplate from "./SideBannersTemplate";
import { SIDE_BANNER_POSITIONS, SideBanner } from "./side-banner.types";

type Props = {
  banners?: SideBanner[];
};

const SideBannerContainer: React.FC<Props> = ({ banners = [] }) => {
  const bannerMap = Object.fromEntries(
    banners.map((banner) => [banner.position, banner])
  ) as Record<string, SideBanner>;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      {SIDE_BANNER_POSITIONS.map((position) => {
        const banner = bannerMap[position];

        return banner ? (
          <SideBannersTemplate key={banner.id} banner={banner} />
        ) : (
          <SideBannerEmptyState key={position} position={position} />
        );
      })}
    </div>
  );
};

export default SideBannerContainer;
