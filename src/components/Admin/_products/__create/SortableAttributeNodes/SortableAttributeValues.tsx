"use client";

import React, { useState } from "react";
import { AttributeValue } from "../attribute-tree ";

type Props = {
  values: AttributeValue[];
  onValuesChange?: (next: AttributeValue[]) => void;
};

const SortableAttributeValues: React.FC<Props> = ({ values, onValuesChange }) => {
  const [items, setItems] = useState([...values]);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const sortedItems = [...items].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const handleMouseDown = (id: number) => setDraggingId(id);
  const handleMouseUp = (overId: number) => {
    if (draggingId === null || draggingId === overId) return;
    const idxA = items.findIndex((i) => i.id === draggingId);
    const idxB = items.findIndex((i) => i.id === overId);
    if (idxA === -1 || idxB === -1) return;

    const newItems = [...items];
    // swap display_order
    const tmp = newItems[idxA];
    newItems[idxA] = { ...newItems[idxB], display_order: newItems[idxA].display_order };
    newItems[idxB] = { ...tmp, display_order: newItems[idxB].display_order };

    setItems(newItems);
    onValuesChange?.(newItems);
    setDraggingId(null);
  };

  return (
    <div className="ml-4 mt-1">
      {sortedItems.map((val) => (
        <div
          key={val.id}
          onMouseDown={() => handleMouseDown(val.id)}
          onMouseUp={() => handleMouseUp(val.id)}
          className={`p-1 border rounded mb-1 bg-white ${
            draggingId === val.id ? "opacity-50 border-blue-500" : ""
          }`}
        >
          <div className="flex justify-between">
            <div>{val.value}</div>
            <div className="text-xs text-gray-500">order: {val.display_order}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SortableAttributeValues;
