"use client";

import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id?: number | string; // 🟢 optional شد – برای dynamic add via cloneElement
  selectedIds?: (number | string)[];
  onSelectionChange?: (id: number | string, isSelected: boolean) => void;
  children?: React.ReactNode; // optional (از قبل)
  disabled?: boolean;
};

const SelectableCard: React.FC<Props> = ({
  id, // حالا optional
  selectedIds = [],
  onSelectionChange,
  children,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(selectedIds.includes(id ?? "")); // fallback خالی برای includes
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setSelected(selectedIds.includes(id ?? "")); // fallback
  }, [selectedIds, id]);

  const handleChange = (newSelected: boolean) => {
    if (disabled || !id) return; // اگر id نباشه، skip
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
      {!disabled &&
        (hovered || selected) && ( // چک id
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
