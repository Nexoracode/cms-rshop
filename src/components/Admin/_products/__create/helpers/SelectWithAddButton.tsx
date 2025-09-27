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
    <div className="flex gap-2 items-center justify-center w-full">
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
      <p
        className="w-24 z-10 text-center text-purple-700 bg-purple-200 rounded-xl mt-[24px] py-1.5 cursor-pointer truncate"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddNewClick();
        }}
      >
        + افزودن
      </p>
    </div>
  );
};

export default SelectWithAddButton;
