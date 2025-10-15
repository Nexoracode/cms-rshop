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

  /** Notify parent when selection changes */
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

  useEffect(() => {
    onSelectionChange?.(id, selected);
  }, [selected, id]);

  // sync with parent's selected IDs
  useEffect(() => {
    const isSelected = selectedIds.includes(id);
    if (isSelected !== selected) setSelected(isSelected);
  }, [selectedIds, id]);

  const toggleSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.stopPropagation();

    const next = !selected;
    setSelected(next);
    onSelectionChange?.(id, next);
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
                onValueChange={(v) => setSelected(!!v)}
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
