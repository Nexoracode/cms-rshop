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
    <div className="flex flex-col gap-4 border rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          {description && (
            <p className="text-gray-600 text-[13px]">{description}</p>
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
