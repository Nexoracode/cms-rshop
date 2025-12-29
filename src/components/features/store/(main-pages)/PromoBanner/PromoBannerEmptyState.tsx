import AddSectionCard from "../shared/AddSectionCard";
import PromoBannerFormModal from "./PromoBannerFormModal";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";

const PromoBannerEmptyState = () => {
  return (
    <AddSectionCard
      className="h-[70px]"
      children={
        <div className="w-full flex gap-4 items-center justify-between px-4">
          <PromoBannerFormModal />
          <TfiLayoutMediaOverlay className="text-3xl"/>
        </div>
      }
    />
  );
};

export default PromoBannerEmptyState;
