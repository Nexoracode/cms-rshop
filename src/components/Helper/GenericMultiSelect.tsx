"use client";

import { Select, SelectItem, Chip } from "@heroui/react";
import { ReactNode } from "react";
import { SelectOption } from "@/types";

type GenericMultiSelectProps = {
  label?: string;
  items: SelectOption[];
  renderItem?: (item: SelectOption) => ReactNode;
  renderValue?: (items: SelectOption[]) => ReactNode;
};

export default function GenericMultiSelect({
  label = "انتخاب کنید",
  items,
  renderItem,
  renderValue,
}: GenericMultiSelectProps) {
  return (
    <Select
      items={items}
      isMultiline
      label={label}
      labelPlacement="outside"
      placeholder="یک یا چند گزینه را انتخاب کنید"
      selectionMode="multiple"
      variant="flat"
      renderValue={(selectedItems) => {
        const validItems = selectedItems
          .map((item) => item.data)
          .filter((data): data is SelectOption => !!data);

        return renderValue ? (
          renderValue(validItems)
        ) : (
          <div className="flex flex-wrap gap-2">
            {validItems.map((item) => (
              <Chip key={item.key}>{item.title}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(item) => (
        <SelectItem key={item.key} textValue={item.title}>
          {renderItem ? renderItem(item) : item.title}
        </SelectItem>
      )}
    </Select>
  );
}
