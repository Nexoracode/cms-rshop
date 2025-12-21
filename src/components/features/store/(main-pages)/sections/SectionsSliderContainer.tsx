import SectionTemplate from "./SectionTemplate";

type Props = {
  sections?: any[];
};

const SectionsSliderContainer: React.FC<Props> = ({ sections = [] }) => {
  if (!sections.length) return null;

  return (
    <div className="w-full flex flex-col gap-8">
      {sections
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((section) => (
          <SectionTemplate key={section.id} section={section} />
        ))}
    </div>
  );
};

export default SectionsSliderContainer;
