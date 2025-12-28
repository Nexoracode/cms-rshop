import AddNewPopularSection from "./AddNewSections/PopularSection/AddNewPopularSection";
import AddNewProducsSection from "./AddNewSections/AddNewProducsSection";
import AddNewCategorySection from "./AddNewSections/CategorySection/AddNewCategorySection";
import SectionTemplate from "./SectionTemplate";

type Props = {
  sections?: any;
};

const SectionsSliderContainer: React.FC<Props> = ({ sections = [] }) => {
  const groupedSections = sections.reduce((acc: any, section: any) => {
    const type = section.section_type;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(section);
    return acc;
  }, {});
  console.log(sections);
  
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-8">
        {sections.length ? (
          <>
            {groupedSections?.most_popular ? (
              groupedSections?.most_popular
                .sort((a: any, b: any) => a.sort_order - b.sort_order)
                .map((section: any) => (
                  <SectionTemplate key={section.id} section={section} />
                ))
            ) : (
              <AddNewPopularSection />
            )}

            {groupedSections?.category_based ? (
              groupedSections?.category_based
                .sort((a: any, b: any) => a.sort_order - b.sort_order)
                .map((section: any) => (
                  <SectionTemplate key={section.id} section={section} />
                ))
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
              <AddNewProducsSection />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <AddNewPopularSection />
            <AddNewCategorySection />
            <AddNewProducsSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionsSliderContainer;
