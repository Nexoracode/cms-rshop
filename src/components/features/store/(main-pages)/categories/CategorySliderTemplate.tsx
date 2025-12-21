"use client";

type CategorySlidersTemplateProps = {
  category: any;
};

const CategorySlidersTemplate: React.FC<CategorySlidersTemplateProps> = ({
  category,
}) => {
  return (
    <div className="w-fit flex flex-col justify-center items-center gap-6 relative cursor-pointer hover:scale-95 transition-all">
      <div className="bg-gray-100 rounded-full absolute bottom-[32px] w-[120px] h-[120px]"></div>
      <img src={category.image} alt={category.name} className="w-[100px] h-[100px] object-cover rounded-md z-10" />
      <p className="text-gray-700 z-10">{category.name}</p>
    </div>
  );
};

export default CategorySlidersTemplate;
