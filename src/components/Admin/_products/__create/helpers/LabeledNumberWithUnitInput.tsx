"use client";

import { FC } from "react";
import { NumberInput, Select, SelectItem } from "@heroui/react";

type Option = {
  key: string;
  title: string;
};

type Props = {
  label: string;
  placeholder?: string;
  value: number;
  onValueChange: (val: number) => void;
  selectedKey: string;
  onSelectChange: (val: string) => void;
  options: Option[]
};

const LabeledNumberWithUnitInput: FC<Props> = ({
  label,
  placeholder = "1",
  value,
  onValueChange,
  selectedKey,
  onSelectChange,
  options
}) => {
  return (
    <div className="flex flex-col gap-4">
      <NumberInput
        hideStepper
        label={label}
        placeholder={placeholder}
        minValue={0}
        value={value}
        onValueChange={(val) => onValueChange(+val)}
        labelPlacement="outside"
        endContent={
          <div className="min-w-[110px]">
            <Select
              isRequired
              labelPlacement="outside"
              aria-label="select"
              placeholder="مقداری را وارد کنید"
              selectedKeys={[selectedKey]}
              onChange={(e) => onSelectChange(e.target.value)}
            >
              {options && options.length ? (
                options.map((opt) => (
                  <SelectItem key={opt.key}>{opt.title}</SelectItem>
                ))
              ) : (
                <SelectItem key="-1" isDisabled>
                  گزینه‌ای وجود ندارد
                </SelectItem>
              )}
            </Select>
          </div>
        }
        className="justify-center"
      />
    </div>
  );
};

export default LabeledNumberWithUnitInput;
