"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id: number | string;
  initialSelected?: boolean;

  /** Parent's selected IDs to sync with */
  selectedIds?: (number | string)[];

  disabled?: boolean;
  className?: string; // extra Card classes
  bodyClassName?: string; // extra CardBody classes

  /** Notify parent when selection changes (only on user action) */
  onSelectionChange?: (id: number | string, selected: boolean) => void;

  /** Card content */
  children?: React.ReactNode;
};

const SelectableCard: React.FC<Props> = ({
  id,
  initialSelected = false,
  selectedIds = [],
  disabled = false,
  className = "",
  bodyClassName = "",
  onSelectionChange,
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<boolean>(!!initialSelected);

  // sync with parent's selected IDs (do NOT notify parent here)
  useEffect(() => {
    const isSelected = selectedIds.includes(id);
    if (isSelected !== selected) {
      setSelected(isSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds, id]);

  const toggleSelection = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    e?.stopPropagation();
    const newSelected = !selected;
    setSelected(newSelected);
    // notify parent immediately about *user-initiated* change
    onSelectionChange?.(id, newSelected);
  };

  // checkbox change should also notify parent (user action)
  const handleCheckboxChange = (v: boolean | number | string) => {
    if (disabled) return;
    const newSelected = !!v;
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <Card
      isBlurred
      className={`relative border shadow-md hover:shadow-lg transition-all duration-200 ${
        selected ? "border-sky-500 shadow-none scale-[0.98]" : "border-gray-200"
      } ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardBody
        onClick={disabled ? undefined : (e) => toggleSelection(e)}
        className={`relative cursor-pointer p-2 ${bodyClassName}`}
      >
        {!disabled && (hovered || selected) && (
          <Tooltip
            closeDelay={2000}
            color="primary"
            showArrow
            placement="left"
            content="انتخاب کارت"
            className="text-white"
          >
            <div className="absolute bg-sky-500/30 pr-3 pl-0.5 py-2 rounded-xl z-10">
              <Checkbox
                isSelected={selected}
                onValueChange={(v) => handleCheckboxChange(!!v)}
              />
            </div>
          </Tooltip>
        )}

        {children}
      </CardBody>
    </Card>
  );
};

export default SelectableCard;
