"use client";

import React, { useEffect, useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import { Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id: number | string;
  initialSelected?: boolean;
  selectedIds?: (number | string)[];
  className?: string;
  bodyClassName?: string;
  onSelectionChange?: (id: number | string, selected: boolean) => void;
  children?: React.ReactNode;
  redirect?: string;
};

const SelectableCard: React.FC<Props> = ({
  id,
  initialSelected = false,
  selectedIds = [],
  className = "",
  bodyClassName = "",
  redirect = "",
  onSelectionChange,
  children,
}) => {
  const [selected, setSelected] = useState<boolean>(!!initialSelected);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const isSelected = selectedIds.includes(id);
    if (isSelected !== selected) {
      setSelected(isSelected);
    }
  }, [selectedIds, id]);

  const handleSelectionChange = (newSelected: boolean) => {
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <BaseCard
      selected={selected}
      redirect={redirect}
      className={className}
      bodyClassName={bodyClassName}
      onClick={() => setHovered((h) => !h)}
    >
      {(hovered || selected) && (
        <Tooltip
          closeDelay={2000}
          color="primary"
          showArrow
          placement="left"
          content="انتخاب کارت"
          className="text-white"
        >
          <div className="absolute bg-sky-500/30 pr-3 pl-0.5 py-2 rounded-xl z-10">
            <Checkbox isSelected={selected} onValueChange={(v) => handleSelectionChange(!!v)} />
          </div>
        </Tooltip>
      )}
      {children}
    </BaseCard>
  );
};

export default SelectableCard;
