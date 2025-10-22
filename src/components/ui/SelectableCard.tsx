"use client";

import React, { useEffect, useState } from "react";
import BaseCard from "@/components/ui/BaseCard";

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
  const [selected, setSelected] = useState<boolean>(!!initialSelected);

  useEffect(() => {
    const isSelected = selectedIds.includes(id);
    if (isSelected !== selected) {
      setSelected(isSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds, id]);

  const handleSelectionChange = (newSelected: boolean) => {
    if (disabled) return;
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <BaseCard
      selectable
      selected={selected}
      disabled={disabled}
      className={className}
      bodyClassName={bodyClassName}
      onSelectionChange={handleSelectionChange}
    >
      {children}
    </BaseCard>
  );
};

export default SelectableCard;
