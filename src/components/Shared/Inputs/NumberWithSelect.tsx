"use client";

import { FC } from "react";
import { NumberInput, Select, SelectItem } from "@heroui/react";
import FieldErrorText from "@/components/Helper/FieldErrorText";

type Option = {
  key: string;
  title: string;
};

type Props = {
  label: string;
  placeholder?: string;
  value?: number;
  onValueChange: (val: number | undefined) => void;
  selectedKey: string;
  onSelectChange: (val: string) => void;
  options: Option[];
  isRequired?: boolean;
  style?: string;
  isActiveError?: boolean;
  maxValue?: number
};

const NumberWithSelect: FC<Props> = ({
  label,
  placeholder = "1",
  value,
  onValueChange,
  selectedKey,
  onSelectChange,
  options,
  isRequired = false,
  style,
  isActiveError = false,
  maxValue
}) => {
  return (
    <div className={`flex flex-col gap-4 ${style}`}>
      <NumberInput
        hideStepper
        isRequired={isRequired}
        label={label}
        placeholder={placeholder}
        minValue={0}
        maxValue={maxValue}
        value={value}
        onValueChange={(val: any) => {
          if (typeof val === "number") onValueChange(val);
          else if (typeof val === "string") {
            const trimmed = val.trim();
            onValueChange(trimmed === "" ? undefined : Number(trimmed));
          } else onValueChange(undefined);
        }}
        labelPlacement="outside"
        errorMessage={
          isRequired &&
          !value && <FieldErrorText error={`${label} الزامی است`} />
        }
        description={
          isRequired &&
          !value && isActiveError && <FieldErrorText error={`${label} الزامی است`} />
        }
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

export default NumberWithSelect;
