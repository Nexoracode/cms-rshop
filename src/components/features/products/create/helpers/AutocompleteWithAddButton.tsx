"use client";

import { FC } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
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

const AutocompleteWithAddButton: FC<Props> = ({
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
      <Autocomplete
        label={label}
        placeholder={placeholder}
        variant="flat"
        labelPlacement="outside"
        isRequired={isRequired}
        startContent={<FiSearch className="text-lg pointer-events-none" />}
        className="w-full"
        selectedKey={selectedId ? String(selectedId) : undefined}
        onSelectionChange={(key) => {
          if (key) onChange(key.toString());
        }}
      >
        {options.length ? (
          options.map((opt) => (
            <AutocompleteItem key={opt.id} textValue={opt.title}>
              {opt.title}
            </AutocompleteItem>
          ))
        ) : (
          <AutocompleteItem key="empty" isDisabled>
            آیتمی موجود نیست
          </AutocompleteItem>
        )}
      </Autocomplete>

     {/*  <p
        className="w-24 z-10 text-center text-purple-700 bg-purple-200 rounded-xl mt-[24px] py-1.5 cursor-pointer truncate hover:bg-purple-300 transition-all"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddNewClick();
        }}
      >
        + افزودن
      </p> */}
    </div>
  );
};

export default AutocompleteWithAddButton;
