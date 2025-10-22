"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id: number | string;
  initialSelected?: boolean;
  selectedIds?: (number | string)[];
  disabled?: boolean;
  className?: string;
  bodyClassName?: string;
  onSelectionChange?: (id: number | string, selected: boolean) => void;
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
    const isSelected = selectedIds.includes(id);
    if (isSelected !== selected) {
      setSelected(isSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds, id]);

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
        className={`relative p-2 ${disabled ? "" : "cursor-pointer"} ${bodyClassName}`}
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
