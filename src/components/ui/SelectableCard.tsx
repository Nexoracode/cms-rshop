import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id: number | string;
  selectedIds?: (number | string)[];
  onSelectionChange?: (id: number | string, isSelected: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean; // 🟢 اضافه شد
};

const SelectableCard: React.FC<Props> = ({
  id,
  selectedIds = [],
  onSelectionChange,
  children,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(selectedIds.includes(id));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setSelected(selectedIds.includes(id));
  }, [selectedIds, id]);

  const handleChange = (newSelected: boolean) => {
    if (disabled) return; // 🟢 اگر غیر فعال است، کاری انجام نده
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <div
      className={`relative transition-all duration-300 rounded-xl border border-transparent
        ${selected ? "border border-sky-300 scale-95" : ""}
        ${disabled ? "pointer-events-none cursor-default" : ""}
      `}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      {/* 🟢 tooltip و checkbox فقط وقتی کارت فعال است نمایش داده شود */}
      {!disabled && (hovered || selected) && (
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
