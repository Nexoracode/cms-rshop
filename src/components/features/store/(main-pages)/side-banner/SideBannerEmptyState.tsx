import AddSectionCard from "../shared/AddSectionCard";
import { CiImageOn } from "react-icons/ci";
import SideBannerFormModal from "./SideBannerFormModal";

const SideBannerEmptyState = () => {
  return (
    <AddSectionCard
      className="w-[190px] h-[156px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <CiImageOn className="text-gray-600 text-[70px]" />
          <SideBannerFormModal position="top_left" bannerId={1} defaultValues={[]} isOpen={false} onOpenChange={() => {}}/>
        </div>
      }
    />
  );
};

export default SideBannerEmptyState;
