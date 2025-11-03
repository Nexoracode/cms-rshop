import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id: number | string;
  selectedIds?: (number | string)[];
  onSelectionChange?: (id: number | string, selected: boolean) => void;
  children: React.ReactNode;
};

const SelectableCard: React.FC<Props> = ({
  id,
  selectedIds = [],
  onSelectionChange,
  children,
}) => {
  const [selected, setSelected] = useState(selectedIds.includes(id));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!selectedIds.length) return;
    selectedIds.includes(id) && setSelected(true);
  }, [selectedIds, id]);

  const handleChange = (newSelected: boolean) => {
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <div
      className={`relative transition-all duration-300 rounded-xl border border-transparent
        ${
          selected
            ? "border border-sky-300 scale-95"
            : ""
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {(hovered || selected) && (
        <Tooltip content="انتخاب کارت" color="secondary" showArrow>
          <div className="absolute top-2 right-2 z-10 bg-sky-500/30 py-1.5 rounded-lg">
            <Checkbox
              isSelected={selected}
              color="secondary"
              className="mr-0.5"
              onValueChange={(v) => handleChange(!!v)}
            />
          </div>
        </Tooltip>
      )}
      {children}
    </div>
  );
};

export default SelectableCard;
