"use client";

import { FC } from "react";
import { NumberInput, Select, SelectItem } from "@heroui/react";

type DiscountKey = "percent" | "amount";

type Option = {
  key: DiscountKey;
  title: string;
};

type Props = {
  label: string;
  placeholder?: string;
  value?: number;                                // ← می‌تواند undefined باشد
  onValueChange: (val: number | undefined) => void;
  selectedKey: DiscountKey;
  onSelectChange: (val: DiscountKey) => void;
  options: Option[];
};

const LabeledNumberWithUnitInput: FC<Props> = ({
  label,
  placeholder = "1",
  value,
  onValueChange,
  selectedKey,
  onSelectChange,
  options,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <NumberInput
        hideStepper
        label={label}
        placeholder={placeholder}
        minValue={0}
        value={value}
        onValueChange={(val: any) => {
          // val ممکن است string یا number یا undefined باشد
          if (typeof val === "number") {
            onValueChange(val);
          } else if (typeof val === "string") {
            const trimmed = val.trim();
            onValueChange(trimmed === "" ? undefined : Number(trimmed));
          } else {
            onValueChange(undefined);
          }
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
              onChange={(e) => onSelectChange(e.target.value as DiscountKey)}
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
