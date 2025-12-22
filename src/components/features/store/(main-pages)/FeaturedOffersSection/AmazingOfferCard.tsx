import { IoIosArrowBack } from "react-icons/io";

const AmazingOfferCard = () => {
  return (
    <div className="h-[254px] w-[160px] flex flex-col items-center justify-center ml-6">
      <img
        src="/images/AmazingText.png"
        alt="AmazingText"
        className="w-[88px]"
      />
      <div className="w-full h-100 mt-4 mb-2 flex items-center justify-center">
        <p className="bg-gray-100 w-fit px-2 rounded-lg">32 : 04 : 12</p>
      </div>
      <img src="/images/Amazing.png" alt="AmazingText" className="w-[80px]" />
      <div className="flex items-center gap-1 mt-4 text-white">
        <p>مشاهده همه</p>
        <IoIosArrowBack />
      </div>
    </div>
  );
};

export default AmazingOfferCard;
