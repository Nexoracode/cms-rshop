"use client";

import { NumberInput, Checkbox } from "@heroui/react";
import { FC } from "react";

type Props = {
  label: string;
  placeholder?: string;
  endText?: string;
  value: number;
  isOptionalEnabled: boolean;
  onValueChange: (val: number) => void;
  onOptionalToggle: (checked: boolean) => void;
  optionalLabel: string;
  min?: number;
};

const NumberWithOptionalCheckbox: FC<Props> = ({
  label,
  placeholder = "",
  endText = "",
  value,
  isOptionalEnabled,
  onValueChange,
  onOptionalToggle,
  optionalLabel,
  min = 1,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        minValue={min}
        isRequired
        isDisabled={isOptionalEnabled}
        endContent={
          endText ? (
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small truncate">
                {endText}
              </span>
            </div>
          ) : null
        }
        value={value}
        onValueChange={(val) => onValueChange(+val)}
      />

      <Checkbox isSelected={isOptionalEnabled} onValueChange={onOptionalToggle}>
        <p className="text-sm">{optionalLabel}</p>
      </Checkbox>
    </div>
  );
};

export default NumberWithOptionalCheckbox;
