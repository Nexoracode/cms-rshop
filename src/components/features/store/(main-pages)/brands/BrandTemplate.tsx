"use client";

type BrandTemplateProps = {
  brand: any;
};

const BrandTemplate: React.FC<BrandTemplateProps> = ({
  brand,
}) => {
  return (
    <div className="w-fit flex flex-col justify-center items-center gap-6 relative cursor-pointer hover:scale-95 transition-all">
      <div className="bg-gray-100 rounded-full absolute bottom-[32px] w-[100px] h-[100px]"></div>
      <img src={brand.logo} alt={"brand"} className="w-[80px] h-[80px] object-cover rounded-md z-10" />
    </div>
  );
};

export default BrandTemplate;
