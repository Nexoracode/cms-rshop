"use client";

import React, { useState, useEffect } from "react";
import { Attribute } from "../attribute-tree ";
import SortableAttributeValues from "./SortableAttributeValues";
import { useReorderAttribute } from "@/hooks/attributes/useAttribute";

type Props = {
  attributes: Attribute[];
};

const SortableAttributes: React.FC<Props> = ({ attributes }) => {
  const [items, setItems] = useState(attributes);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderAttribute = useReorderAttribute();

  useEffect(() => {
    setItems(attributes);
  }, [attributes]);

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
        reorderAttribute.mutateAsync(payloadA),
        reorderAttribute.mutateAsync(payloadB),
      ]);

      const newItems = [...items];
      [newItems[idxA], newItems[idxB]] = [newItems[idxB], newItems[idxA]];
      newItems[idxA].display_order = payloadA.display_order;
      newItems[idxB].display_order = payloadB.display_order;
      setItems(newItems);
    } catch (err) {
      console.error("Swap failed:", err);
    } finally {
      setDraggingId(null);
    }
  };

  return (
    <div className="ml-4 mt-2">
      {items
        .slice()
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((attr) => (
          <div
            key={attr.id}
            draggable
            onDragStart={() => handleDragStart(attr.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(attr.id)}
            className={`mb-2 p-2 border rounded ${
              draggingId === attr.id ? "bg-blue-100" : ""
            }`}
          >
            <strong>{attr.name}</strong> ({attr.type})
            <SortableAttributeValues values={attr.values} />
          </div>
        ))}
    </div>
  );
};

export default SortableAttributes;
