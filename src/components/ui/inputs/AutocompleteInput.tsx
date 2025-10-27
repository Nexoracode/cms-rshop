"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

export type Option = {
  id: string | number;
  title: string;
};

type AutocompleteInputProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  selectedId?: string | number;
  onChange: (id: string) => void;
  isRequired?: boolean;
  className?: string;
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label = "",
  placeholder = "انتخاب کنید",
  options,
  selectedId,
  onChange,
  isRequired = false,
  className = "",
}) => {
  return (
    <Autocomplete
      label={label}
      placeholder={placeholder}
      variant="flat"
      labelPlacement="outside"
      isRequired={isRequired}
      startContent={<FiSearch className="text-lg pointer-events-none" />}
      className={`w-full ${className}`}
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
  );
};

export default AutocompleteInput;
