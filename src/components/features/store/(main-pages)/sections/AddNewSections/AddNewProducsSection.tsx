import AddSectionCard from "../../shared/AddSectionCard";
import AddNewSectionModal from "../AddNewSectionModal";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

const AddNewProducsSection = () => {
  return (
    <AddSectionCard
      className="h-[276px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <TfiLayoutSliderAlt className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            با ایجاد بخش‌های مختلف، محصولات را به شکل‌های متنوع نمایش دهید.
            <br />
            مانند پرفروش‌ترین‌ها، تخفیف‌ها یا محصولات داغ.
          </p>
          <AddNewSectionModal />
        </div>
      }
    />
  );
};

export default AddNewProducsSection;
