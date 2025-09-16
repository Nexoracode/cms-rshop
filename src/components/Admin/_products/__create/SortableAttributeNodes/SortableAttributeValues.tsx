// components/SortableAttributeValues.tsx
"use client";

import React, { useEffect, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AttributeValue } from "../attribute-tree ";
import SortableItem from "./SortableItem";

type Props = {
  values: AttributeValue[];
  parentAttributeId?: number;
  onValuesChange?: (next: AttributeValue[]) => void;
};

const ValueRow: React.FC<{ val: AttributeValue; disabled?: boolean }> = ({ val, disabled }) => {
  return (
    <div className={`p-1 border rounded mb-1 bg-white ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm">{val.value}</div>
        <div className="text-xs text-gray-500">order: {String(val.display_order ?? "-")}</div>
      </div>
    </div>
  );
};

const SortableAttributeValues: React.FC<Props> = ({ values, parentAttributeId, onValuesChange }) => {
  const [items, setItems] = useState<AttributeValue[]>(values);
  const [busy] = useState(false);

  useEffect(() => setItems(values), [values]);

  useEffect(() => {
    onValuesChange?.(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="ml-4 mt-1">
      <SortableContext items={items.map((v) => String(v.id))} strategy={verticalListSortingStrategy}>
        {items.map((val) => (
          <div key={val.id} id={String(val.id)}>
            <SortableItem id={val.id} className="mb-1">
              <ValueRow val={val} disabled={busy} />
            </SortableItem>
          </div>
        ))}
      </SortableContext>
    </div>
  );
};

export default SortableAttributeValues;
