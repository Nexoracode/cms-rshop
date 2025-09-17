"use client";

import React, { useState } from "react";
import { Attribute } from "../attribute-tree ";
import SortableAttributeValues from "./SortableAttributeValues";

type Props = {
  attributes: Attribute[];
  onAttributesChange?: (next: Attribute[]) => void;
};

const SortableAttributes: React.FC<Props> = ({ attributes, onAttributesChange }) => {
  const [items, setItems] = useState([...attributes]);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const sortedItems = [...items].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const handleMouseDown = (id: number) => setDraggingId(id);
  const handleMouseUp = (overId: number) => {
    if (draggingId === null || draggingId === overId) return;
    const idxA = items.findIndex((i) => i.id === draggingId);
    const idxB = items.findIndex((i) => i.id === overId);
    if (idxA === -1 || idxB === -1) return;

    const newItems = [...items];
    const tmp = newItems[idxA];
    newItems[idxA] = { ...newItems[idxB], display_order: newItems[idxA].display_order };
    newItems[idxB] = { ...tmp, display_order: newItems[idxB].display_order };

    setItems(newItems);
    onAttributesChange?.(newItems);
    setDraggingId(null);
  };

  const handleValuesChange = (attrId: number, nextValues: any[]) => {
    const newItems = items.map((a) => (a.id === attrId ? { ...a, values: nextValues } : a));
    setItems(newItems);
    onAttributesChange?.(newItems);
  };

  return (
    <div className="ml-4 mt-2">
      {sortedItems.map((attr) => (
        <div
          key={attr.id}
          onMouseDown={() => handleMouseDown(attr.id)}
          onMouseUp={() => handleMouseUp(attr.id)}
          className={`mb-2 p-2 border rounded bg-white ${
            draggingId === attr.id ? "opacity-50 border-green-500" : ""
          }`}
        >
          <div className="flex justify-between">
            <strong>{attr.name}</strong>
            <span className="text-xs">{attr.type}</span>
            <span className="text-xs text-gray-500">order: {attr.display_order}</span>
          </div>

          <SortableAttributeValues
            values={attr.values}
            onValuesChange={(next) => handleValuesChange(attr.id, next)}
          />
        </div>
      ))}
    </div>
  );
};

export default SortableAttributes;
