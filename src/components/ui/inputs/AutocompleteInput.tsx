"use client";

import React, { useCallback } from "react";
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
  searchValue?: string;
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
  // 🔹 تابع به‌روزرسانی URL در زمان تایپ
  const handleSearchChange = useCallback(
    (val: string) => {
      if (syncSearchToUrl) {
        const params = new URLSearchParams(window.location.search);
        if (val) {
          params.set("search", val);
        } else {
          params.delete("search");
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", newUrl);
      }
    },
    [syncSearchToUrl]
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
      onInputChange={handleSearchChange}
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
