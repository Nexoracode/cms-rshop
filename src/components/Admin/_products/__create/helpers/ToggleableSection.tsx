"use client";

import { FC, ReactNode, useState } from "react";
import { Checkbox } from "@heroui/react";

type Props = {
  children: ReactNode;
  onOptionalToggle: (checked: boolean) => void;
  label: string;
  isChecked?: boolean
};

const ToggleableSection: FC<Props> = ({
  onOptionalToggle,
  label,
  children,
  isChecked
}) => {
  const [isSelected, setIsSelected] = useState(isChecked || false);

  const handleToggle = (checked: boolean) => {
    setIsSelected(checked);
    onOptionalToggle(checked);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className={isSelected ? "pointer-events-none opacity-60 select-none" : ""}>
        {children}
      </div>

      <Checkbox isSelected={isSelected} onValueChange={handleToggle}>
        <p className="text-sm">{label}</p>
      </Checkbox>
    </div>
  );
};

export default ToggleableSection;
