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
    setSelected(selectedIds.includes(id));
  }, [selectedIds, id]);

  const handleChange = (newSelected: boolean) => {
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {(hovered || selected) && (
        <Tooltip content="انتخاب کارت" color="primary" showArrow placement="left">
          <div className="absolute top-2 left-2 z-10 bg-sky-500/30 p-1 rounded">
            <Checkbox isSelected={selected} onValueChange={(v) => handleChange(!!v)} />
          </div>
        </Tooltip>
      )}
      {children}
    </div>
  );
};

export default SelectableCard;
