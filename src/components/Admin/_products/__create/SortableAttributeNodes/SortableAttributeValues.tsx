"use client";

import React, { useState } from "react";
import { AttributeValue } from "../attribute-tree ";

type Props = {
  values: AttributeValue[];
  onValuesChange?: (values: AttributeValue[]) => void;
  reorderValue: {
    mutateAsync: (data: { id: number; display_order: number }) => Promise<any>;
  };
};

const SortableAttributeValues: React.FC<Props> = ({
  values,
  onValuesChange,
  reorderValue,
}) => {
  const [items, setItems] = useState(values);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleMouseUp = async (overId: number) => {
    if (draggingId === null || draggingId === overId) return;
    const idxA = items.findIndex((i) => i.id === draggingId);
    const idxB = items.findIndex((i) => i.id === overId);
    if (idxA === -1 || idxB === -1) return;

    const itemA = items[idxA];
    const itemB = items[idxB];

    const payloadA = { id: itemA.id, display_order: itemB.display_order! };
    const payloadB = { id: itemB.id, display_order: itemA.display_order! };

    try {
      await Promise.all([
        reorderValue.mutateAsync(payloadA),
        reorderValue.mutateAsync(payloadB),
      ]);

      const newItems = [...items];
      newItems[idxA] = { ...itemB, display_order: payloadA.display_order };
      newItems[idxB] = { ...itemA, display_order: payloadB.display_order };
      setItems(newItems);
      onValuesChange?.(newItems);
    } catch (err) {
      console.error("Swap failed:", err);
    } finally {
      setDraggingId(null);
    }
  };

  return (
    <div className="ml-4 mt-1">
      {items
        .slice()
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((val) => (
          <div
            key={val.id}
            draggable
            onDragStart={() => handleDragStart(val.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleMouseUp(val.id)}
            className={`p-1 border rounded mb-1 ${
              draggingId === val.id ? "bg-purple-100" : ""
            }`}
          >
            {val.value}
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeValues;
