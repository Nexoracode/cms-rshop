type Props = {
  label?: string;
  value?: string;
  onChange: (color: string) => void;
  widthFull?: boolean;
};

const ColorPickerField: React.FC<Props> = ({
  label = "رنگ نمایشی",
  value = "#000000",
  onChange,
  widthFull = false,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${widthFull ? "w-full" : "w-fit"}`}>
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <div className={`flex items-center justify-center overflow-hidden border ${widthFull ? "w-full h-10" : "w-20 h-20"} cursor-pointer rounded-xl`}>
        <input
          type="color"
          className={`${widthFull ? "w-full" : "w-28"} h-24 scale-110`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorPickerField;
