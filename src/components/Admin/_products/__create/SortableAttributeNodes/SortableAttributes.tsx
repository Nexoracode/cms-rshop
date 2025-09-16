// components/SortableAttributes.tsx
"use client";

import React, { useEffect, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Attribute } from "../attribute-tree ";
import SortableAttributeValues from "./SortableAttributeValues";
import SortableItem from "./SortableItem";

type Props = {
  attributes: Attribute[];
  parentGroupId?: number;
  onAttributesChange?: (next: Attribute[]) => void;
};

const SortableAttributes: React.FC<Props> = ({ attributes, parentGroupId, onAttributesChange }) => {
  const [items, setItems] = useState<Attribute[]>(attributes);
  const [busy] = useState(false);

  useEffect(() => setItems(attributes), [attributes]);

  useEffect(() => {
    onAttributesChange?.(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="ml-4 mt-2">
      <SortableContext items={items.map((i) => String(i.id))} strategy={verticalListSortingStrategy}>
        {items.map((attr) => (
          <div key={attr.id} id={String(attr.id)}>
            <SortableItem id={attr.id} className="mb-2">
              <div className={`p-2 border rounded bg-white ${busy ? "opacity-60" : ""}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{attr.name}</strong> <span className="text-xs">({attr.type})</span>
                    <div className="text-xs text-gray-500">id: {attr.id}</div>
                  </div>
                  <div className="text-xs text-gray-600">order: {String(attr.display_order ?? "-")}</div>
                </div>
              </div>
            </SortableItem>

            <SortableAttributeValues
              values={attr.values}
              parentAttributeId={attr.id}
              onValuesChange={(nextValues) => {
                setItems((prev) => prev.map((a) => (a.id === attr.id ? { ...a, values: nextValues } : a)));
              }}
            />
          </div>
        ))}
      </SortableContext>
    </div>
  );
};

export default SortableAttributes;
