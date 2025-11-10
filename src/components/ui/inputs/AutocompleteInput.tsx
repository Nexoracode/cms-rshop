"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedUrlSearch } from "@/core/hooks/common/useDebouncedUrlSearch";

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
  /** اگر true باشد، مقدار سرچ در URL ذخیره می‌شود */
  syncSearchToUrl?: boolean;
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label = "",
  placeholder = "انتخاب کنید",
  options,
  selectedId,
  onChange,
  isRequired = false,
  className = "",
  syncSearchToUrl = false,
}) => {
  // اگر syncSearchToUrl فعال باشد، از هوک debounced استفاده می‌کنیم
  const { value, setValue } = useDebouncedUrlSearch(
    syncSearchToUrl ? "search-inp" : undefined,
    500
  );

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
      inputValue={syncSearchToUrl ? value : undefined}
      onInputChange={(val) => {
        if (syncSearchToUrl) setValue(val);
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
