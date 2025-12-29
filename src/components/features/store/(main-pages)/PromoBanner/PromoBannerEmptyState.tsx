import { GrAnnounce } from "react-icons/gr";
import AddSectionCard from "../shared/AddSectionCard";
import PromoBannerFormModal from "./PromoBannerFormModal";

const PromoBannerEmptyState = () => {
  return (
    <AddSectionCard
      className="h-[70px]"
      children={
        <div className="w-full flex gap-4 items-center justify-between px-4">
          <PromoBannerFormModal />
          <GrAnnounce className="text-3xl"/>
        </div>
      }
    />
  );
};

export default PromoBannerEmptyState;
