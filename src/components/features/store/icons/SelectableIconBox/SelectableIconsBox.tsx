"use client";

import { useEffect, useRef } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import IconCard from "../IconCard";
import IconsSelectionModal from "./IconsSelectionModal";
import { FiUsers } from "react-icons/fi";
import { useIconsSelection } from "./IconsSelectionContext";
import { TbIcons } from "react-icons/tb";

type Props = {
  onChange?: (iconIds: number[]) => void;
  initialIcons?: any[];
  error?: boolean;
};

const InnerSelectableIconsBox: React.FC<{
  onChange?: (ids: number[]) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedIcons, removeIcon } = useIconsSelection();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    onChange?.(selectedIcons.map((u) => u.id));
  }, [selectedIcons]);

  return (
    <SelectionBox
      title="آیکون های انتخاب شده"
      icon={<TbIcons className="text-5xl" />}
      initial={selectedIcons}
      modal={<IconsSelectionModal />}
      error={error}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedIcons.map((icon: any) => (
          <IconCard
            key={icon.id}
            showDeselectIcon
            icon={icon}
            onDelete={removeIcon}
          />
        ))}
      </div>
    </SelectionBox>
  );
};

const SelectableIconsBox: React.FC<Props> = ({ onChange, error }) => {
  return <InnerSelectableIconsBox onChange={onChange} error={error} />;
};

export default SelectableIconsBox;
