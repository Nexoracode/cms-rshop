type Props = {
  label?: string;
  value?: string;
  onChange: (color: string) => void;
};

const ColorPickerField: React.FC<Props> = ({
  label = "رنگ نمایشی",
  value = "#000000",
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <input
        type="color"
        className="w-full h-14 rounded-2xl cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ColorPickerField;
