"use client";

import { useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

type Option = {
  id: number | string;
  title: string;
  color?: string;
};

type MultiSelectSearchProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  selectedValues: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  isRequired?: boolean;
};

export default function MultiSelectSearch({
  label = "مقادیر ویژگی",
  placeholder = "جستجو یا انتخاب کنید...",
  options,
  selectedValues,
  onChange,
  isRequired = false,
}: MultiSelectSearchProps) {
  const [inputValue, setInputValue] = useState("");

  // فیلتر زنده هنگام تایپ
  const filteredItems = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.title.toLowerCase().includes(q));
  }, [options, inputValue]);

  const selectedSet = useMemo(
    () => new Set(selectedValues.map((k) => String(k))),
    [selectedValues]
  );

  return (
    <Autocomplete
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      variant="flat"
      isRequired={isRequired}
      inputValue={inputValue}
      onInputChange={setInputValue}
      startContent={<FiSearch className="text-lg pointer-events-none" />}
      listboxProps={{
        selectionMode: "multiple",
        selectedKeys: selectedSet,
        onSelectionChange: (keys) => {
          if (keys === "all") return;
          const arr = Array.from(keys as Set<React.Key>);
          onChange(arr.map(String));
        },
        emptyContent: inputValue ? "نتیجه‌ای یافت نشد" : "آیتمی موجود نیست",
      }}
      renderValue={(selectedItems) => {
        const selected = selectedItems
          .map((i) => i.data)
          .filter(Boolean) as Option[];
        return (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <Chip
                key={item.id}
                size="sm"
                color="secondary"
                variant="flat"
                className="rtl"
              >
                <div className="flex items-center gap-1">
                  {item.color && (
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  {item.title}
                </div>
              </Chip>
            ))}
          </div>
        );
      }}
      className="w-full"
      items={filteredItems}
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.title}>
          <div className="flex items-center gap-2">
            {item.color && (
              <span
                className="inline-block w-4 h-4 rounded-full border"
                style={{ backgroundColor: item.color }}
              />
            )}
            {item.title}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
