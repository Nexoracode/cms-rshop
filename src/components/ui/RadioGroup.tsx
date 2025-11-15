"use client"

import { RadioGroup as RadioGroupHero, Radio } from "@heroui/react";

export type RadioOption = {
  label: string;
  value: string;
};

export interface RadioGroupProps {
  label?: string;
  description?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export default function RadioGroup({
  label,
  description,
  options = [],
  value,
  onChange,
  orientation = "vertical",
  className = "",
}: RadioGroupProps) {
  return (
    <div className={className}>
      <RadioGroupHero
        label={label}
        description={description}
        value={value}
        onValueChange={onChange}
        orientation={orientation}
        className={
          orientation === "horizontal"
            ? "flex flex-row gap-4"
            : "space-y-3"
        }
      >
        {options.map((opt) => (
          <Radio key={opt.value} value={opt.value} className="text-gray-700">
            {opt.label}
          </Radio>
        ))}
      </RadioGroupHero>
    </div>
  );
}