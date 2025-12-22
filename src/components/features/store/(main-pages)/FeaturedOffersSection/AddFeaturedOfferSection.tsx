import OptionButton from "@/components/ui/buttons/OptionButton";
import AddSectionCard from "../shared/AddSectionCard";

const AddFeaturedOfferSection = () => {
  return (
    <AddSectionCard
      label="افزودن پیشنهاد شگفت انگیز برای"
      className="h-[294px] border-5 hover:!border-white !bg-[#E5344E]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/images/AmazingText.png"
            alt="AmazingText"
            className="w-[120px]"
          />
          <div className="flex items-center gap-4">
            <OptionButton
              title="محصولات"
              href="/admin/store/promotions/flash-deal/products"
              className="text-white"
            />
            <OptionButton
              title="دسته‌بندی‌ها"
              href="/admin/store/promotions/flash-deal/categories"
              className="text-white"
            />
          </div>
        </div>
      }
    />
  );
};

export default AddFeaturedOfferSection;
