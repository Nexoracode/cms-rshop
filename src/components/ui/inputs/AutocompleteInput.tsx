"use client";

import React, { useState, useEffect } from "react";
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
  syncSearchToUrl?: boolean;
  searchKey?: string;
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
  searchKey = "search",
}) => {
  const debounced = useDebouncedUrlSearch(
    syncSearchToUrl ? searchKey : undefined,
    500
  );

  const [localSearch, setLocalSearch] = useState<string>(debounced.value ?? "");

  useEffect(() => {
    if (!syncSearchToUrl) return;
    if (!selectedId) setLocalSearch(debounced.value ?? "");
  }, [debounced.value, syncSearchToUrl, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const sel = options.find((o) => String(o.id) === String(selectedId));
    if (sel) setLocalSearch(sel.title);
  }, [selectedId, options]);

  const handleInputChange = (val: string) => {
    setLocalSearch(val);
    if (syncSearchToUrl) debounced.setValue(val);
  };

  const handleSelectionChange = (key: React.Key | null) => {
    if (!key) return;
    onChange(key.toString());
    const sel = options.find((o) => String(o.id) === String(key));
    if (sel) setLocalSearch(sel.title);
  };

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
      onSelectionChange={handleSelectionChange}
      inputValue={localSearch}
      onInputChange={handleInputChange}
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
