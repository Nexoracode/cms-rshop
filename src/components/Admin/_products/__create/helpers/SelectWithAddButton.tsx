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
    <Select
      isRequired={isRequired}
      labelPlacement="outside"
      startContent={<FiSearch className="text-lg pointer-events-none" />}
      label={label}
      placeholder={placeholder}
      selectedKeys={[String(selectedId)]}
      onChange={(e) => onChange(e.target.value)}
      endContent={
        <Button
          variant="flat"
          color="primary"
          size="sm"
          onPress={onAddNewClick}
        >
          + افزودن
        </Button>
      }
    >
      {options.length ? (
        options.map((opt) => <SelectItem key={opt.id}>{opt.title}</SelectItem>)
      ) : (
        <SelectItem isDisabled>آیتمی موجود نیست</SelectItem>
      )}
    </Select>
  );
};

export default SelectWithAddButton;
