import AddSectionCard from "../shared/AddSectionCard";
import HeroSliderFormModal from "./SideBannerFormModal";
import { CiImageOn } from "react-icons/ci";

const SideBannerEmptyState = () => {
  return (
    <AddSectionCard
      className="w-[190px] h-[156px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <CiImageOn className="text-gray-600 text-[70px]" />
          <HeroSliderFormModal />
        </div>
      }
    />
  );
};

export default SideBannerEmptyState;
