import SideBannerEmptyState from "./SideBannerEmptyState";
import SideBannersTemplate from "./SideBannersTemplate";

type Props = {
  banners?: any[];
};

const SideBannerContainer: React.FC<Props> = ({ banners = [] }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      {banners.length ? (
        banners
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((banner) => (
            <SideBannersTemplate key={banner.id} banner={banner} />
          ))
      ) : (
        <SideBannerEmptyState />
      )}
    </div>
  );
};

export default SideBannerContainer;
