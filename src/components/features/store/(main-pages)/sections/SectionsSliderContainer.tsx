import AddSection from "./AddSection";
import SectionTemplate from "./SectionTemplate";

type Props = {
  sections?: any[];
};

const SectionsSliderContainer: React.FC<Props> = ({ sections = [] }) => {
  return (
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
  );
};

export default SectionsSliderContainer;
