"use client";

import { FC } from "react";
import { Select, SelectItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import FieldErrorText from "@/components/Helper/FieldErrorText";

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
  isActiveError?: boolean;
};

const SelectWithAddButton: FC<Props> = ({
  label,
  placeholder,
  options,
  selectedId,
  onChange,
  onAddNewClick,
  isRequired = true,
  isActiveError = false,
}) => {
  return (
    <div
      className={`flex gap-2 justify-center w-full ${
        isRequired && isActiveError ? "items-start" : "items-center"
      }`}
    >
      <div className="w-full flex flex-col">
        <Select
          isRequired={isRequired}
          labelPlacement="outside"
          startContent={<FiSearch className="text-lg pointer-events-none" />}
          label={label}
          placeholder={placeholder}
          selectedKeys={[String(selectedId)]}
          onChange={(e) => onChange(e.target.value)}
          errorMessage={
            isRequired && !selectedId && (
              <FieldErrorText
                error={`${label} الزامی است`}
              />
            )
          }
        >
          {options.length ? (
            options.map((opt) => (
              <SelectItem key={opt.id}>{opt.title}</SelectItem>
            ))
          ) : (
            <SelectItem isDisabled>آیتمی موجود نیست</SelectItem>
          )}
        </Select>
        <div className="mt-1">
          {isRequired && isActiveError && !selectedId && (
            <FieldErrorText
              error={`${label} الزامی است`}
            />
          )}
        </div>
      </div>
      <p
        className={`${
          isRequired && isActiveError ? "!mt-7" : ""
        } w-24 z-10 text-center text-purple-700 bg-purple-200 rounded-xl mt-[24px] py-1.5 cursor-pointer truncate`}
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
