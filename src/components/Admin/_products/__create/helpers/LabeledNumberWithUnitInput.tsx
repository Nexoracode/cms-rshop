"use client";

import { FC } from "react";
import { NumberInput, Select, SelectItem } from "@heroui/react";

type Option = {
  key: string;    // ← آزاد (نه DiscountKey)
  title: string;
};

type Props = {
  label: string;
  placeholder?: string;
  value?: number;                                // ← می‌تواند undefined باشد
  onValueChange: (val: number | undefined) => void;
  selectedKey: string;                           // ← آزاد
  onSelectChange: (val: string) => void;         // ← آزاد
  options: Option[];
  isRequired?: boolean,
  style?: string
};

const LabeledNumberWithUnitInput: FC<Props> = ({
  label,
  placeholder = "1",
  value,
  onValueChange,
  selectedKey,
  onSelectChange,
  options,
  isRequired=false,
  style
}) => {
  return (
    <div className={`flex flex-col gap-4 ${style}`}>
      <NumberInput
        hideStepper
        isRequired={isRequired}
        label={label}
        placeholder={placeholder}
        minValue={0}
        value={value}
        onValueChange={(val: any) => {
          if (typeof val === "number") onValueChange(val);
          else if (typeof val === "string") {
            const trimmed = val.trim();
            onValueChange(trimmed === "" ? undefined : Number(trimmed));
          } else onValueChange(undefined);
        }}
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
              {options.length ? (
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
