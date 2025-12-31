import AddNewPopularSection from "../PopularSection/AddNewPopularSection";
import AddNewSpecialSection from "./AddNewSpecialSection";
import AddNewCategorySection from "../CategorySection/AddNewCategorySection";
import SectionTemplate from "../../SectionTemplate";
import PopularSectionContainer from "../PopularSection/PopularSectionContainer";
import CategorySection from "../CategorySection/CategorySection";

type Props = {
  sections?: any;
};

const SpecialSectionContainer: React.FC<Props> = ({ sections = [] }) => {
  const groupedSections = sections.reduce((acc: any, section: any) => {
    const type = section.section_type;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(section);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-8">
        {sections.length ? (
          <>
            <PopularSectionContainer
              mostPopular={groupedSections?.most_popular?.[0]}
            />

            {groupedSections?.category_based ? (
              <CategorySection categories={groupedSections.category_based} />
            ) : (
              <AddNewCategorySection />
            )}

            {groupedSections?.special_products ? (
              groupedSections?.special_products
                .sort((a: any, b: any) => a.sort_order - b.sort_order)
                .map((section: any) => (
                  <SectionTemplate key={section.id} section={section} />
                ))
            ) : (
              <AddNewSpecialSection />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <AddNewPopularSection />
            <AddNewCategorySection />
            <AddNewSpecialSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialSectionContainer;
