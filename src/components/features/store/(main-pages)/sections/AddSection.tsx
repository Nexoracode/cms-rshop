import AddSectionCard from "../shared/AddSectionCard";
import AddNewSectionModal from "./AddNewSectionModal";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

const AddSection = () => {
  return (
    <AddSectionCard
      className="h-[276px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <TfiLayoutSliderAlt className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            وبسایت هیچ بخشی جهت نمایش ندارد!! <br />
            حداقل یک بخش ایجاد کنید.
          </p>
          <AddNewSectionModal />
        </div>
      }
    />
  );
};

export default AddSection;
