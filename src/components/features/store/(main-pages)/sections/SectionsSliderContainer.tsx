import AddNewPopularSection from "./AddNewSections/PopularSection/AddNewPopularSection";
import AddNewProducsSection from "./AddNewSections/AddNewProducsSection";
import AddNewCategorySection from "./AddNewSections/CategorySection/AddNewCategorySection";
import SectionTemplate from "./SectionTemplate";

type Props = {
  sections?: any;
};

const SectionsSliderContainer: React.FC<Props> = ({ sections = [] }) => {
  
  console.log(sections);
  

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-8">
        {sections.length ? (
          <>
            {sections?.most_popular ? (
              sections?.most_popular
                .sort((a: any, b: any) => a.sort_order - b.sort_order)
                .map((section: any) => (
                  <SectionTemplate key={section.id} section={section} />
                ))
            ) : (
              <AddNewPopularSection />
            )}

            {sections?.category_based ? (
              sections?.category_based
                .sort((a: any, b: any) => a.sort_order - b.sort_order)
                .map((section: any) => (
                  <SectionTemplate key={section.id} section={section} />
                ))
            ) : (
              <AddNewCategorySection />
            )}

            {sections?.special_products ? (
              sections?.special_products
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
