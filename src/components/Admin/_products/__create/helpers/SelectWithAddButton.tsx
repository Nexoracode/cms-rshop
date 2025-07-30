"use client";

import { FC } from "react";
import { Button, Select, SelectItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

type Option = {
  id: number | string;
  title: string;
};

type Props = {
  label: string;
  placeholder: string;
  options: Option[];
  selectedId: string | number;
  onChange: (id: number | string) => void;
  onAddNewClick: () => void;
  isRequired?: boolean;
};

const SelectWithAddButton: FC<Props> = ({
  label,
  placeholder,
  options,
  selectedId,
  onChange,
  onAddNewClick,
  isRequired = true,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Select
        isRequired={isRequired}
        labelPlacement="outside"
        startContent={<FiSearch className="text-lg pointer-events-none" />}
        label={label}
        placeholder={placeholder}
        selectedKeys={[String(selectedId)]}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.length ? (
          options.map((opt) => (
            <SelectItem key={opt.id}>{opt.title}</SelectItem>
          ))
        ) : (
          <SelectItem isDisabled>آیتمی موجود نیست</SelectItem>
        )}
      </Select>

      <div className="w-full flex items-center justify-between">
        <p className="text-[13px] text-gray-600">
          درصورت نیاز آیتم جدیدی را اضافه کنید
        </p>
        <Button
          variant="flat"
          color="primary"
          size="sm"
          onPress={onAddNewClick}
        >
          + افزودن 
        </Button>
      </div>
    </div>
  );
};

export default SelectWithAddButton;
