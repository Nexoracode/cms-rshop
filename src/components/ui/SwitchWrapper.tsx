"use client";

import { useState, ReactNode } from "react";
import { Switch } from "@heroui/react";

type SwitchWrapperProps = {
  label: string;
  description?: string;
  initialSelected?: boolean;
  children?: ReactNode;
};

const SwitchWrapper = ({
  label,
  description,
  initialSelected = false,
  children,
}: SwitchWrapperProps) => {
  const [isSelected, setIsSelected] = useState(initialSelected);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mt-6">
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          {description && (
            <p className="text-gray-600 pr-2 text-[13px] mt-2">{description}</p>
          )}
        </div>
        <Switch
          size="sm"
          aria-label={label}
          isSelected={isSelected}
          onValueChange={setIsSelected}
        />
      </div>

      {isSelected && children}
    </div>
  );
};

export default SwitchWrapper;
