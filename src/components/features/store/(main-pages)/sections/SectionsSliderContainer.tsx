import AddSection from "./AddSection";
import SectionTemplate from "./SectionTemplate";

type Props = {
  sections?: any[];
};

const SectionsSliderContainer: React.FC<Props> = ({ sections = [] }) => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-8">
        {sections.length ? (
          sections
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((section) => (
              <SectionTemplate key={section.id} section={section} />
            ))
        ) : (
          <AddSection />
        )}
      </div>
    </div>
  );
};

export default SectionsSliderContainer;
