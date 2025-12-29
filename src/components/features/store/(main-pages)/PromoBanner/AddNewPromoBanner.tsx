import AddSectionCard from "../shared/AddSectionCard";

const AddNewPromoBanner = () => {
  return (
    <div>
      <AddSectionCard
        label="بنر اطلاع رسانی تبلیغاتی"
        onClick={() => console.log("اضافه شد!")}
        className="h-[60px]"
      />
    </div>
  );
};

export default AddNewPromoBanner;
