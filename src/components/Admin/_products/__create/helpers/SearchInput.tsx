"use client";

import { Input } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (value?: string) => void;
  debounceMs?: number;
};

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  debounceMs = 500,
  placeholder = "جستجو...",
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedValue] = useDebounce(searchInput, debounceMs);

  useEffect(() => {
    const value = debouncedValue.trim();
    onSearch(value.length ? value : undefined);
  }, [debouncedValue, onSearch]);

  return (
    <Input
      isClearable
      size="lg"
      variant="bordered"
      className="bg-white rounded-xl"
      color="secondary"
      placeholder={placeholder}
      value={searchInput}
      onValueChange={setSearchInput}
      startContent={<FiSearch className="text-xl" />}
    />
  );
};

export default SearchInput;
