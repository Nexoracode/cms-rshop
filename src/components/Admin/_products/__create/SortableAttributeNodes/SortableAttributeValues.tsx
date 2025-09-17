"use client";

import React, { useState, useEffect } from "react";
import { AttributeValue } from "../attribute-tree ";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";

type Props = {
  values: AttributeValue[];
};

const SortableAttributeValues: React.FC<Props> = ({ values }) => {
  const [items, setItems] = useState(values);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderValue = useReorderAttributeValue();

  useEffect(() => {
    setItems(values);
  }, [values]);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
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
      [newItems[idxA], newItems[idxB]] = [newItems[idxB], newItems[idxA]];
      newItems[idxA].display_order = payloadA.display_order;
      newItems[idxB].display_order = payloadB.display_order;
      console.log("???????????????????????????????", newItems);
      setItems(newItems);
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
            onDrop={() => handleDrop(val.id)}
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
