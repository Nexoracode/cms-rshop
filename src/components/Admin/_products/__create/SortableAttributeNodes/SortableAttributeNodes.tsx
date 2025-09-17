"use client";

import React, { useState, useEffect } from "react";
import { AttributeNode } from "../attribute-tree ";
import SortableAttributes from "./SortableAttributes";
import { useReorderAttributeGroup } from "@/hooks/attributes/useAttributeGroup";

type Props = {
  attributeNodes: AttributeNode[];
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes }) => {
  const [items, setItems] = useState(attributeNodes);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderGroup = useReorderAttributeGroup();

  // همگام‌سازی با prop وقتی از parent تغییر کرد
  useEffect(() => {
    setItems(attributeNodes);
  }, [attributeNodes]);

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
      // فقط بعد از موفقیت API جایگاه swap شود
      await Promise.all([
        reorderGroup.mutateAsync(payloadA),
        reorderGroup.mutateAsync(payloadB),
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
    <div>
      {items
        .slice()
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((group) => (
          <div
            key={group.id}
            draggable
            onDragStart={() => handleDragStart(group.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(group.id)}
            className={`mb-6 p-4 border rounded ${
              draggingId === group.id ? "bg-green-100" : ""
            }`}
          >
            <h3 className="font-bold">{group.name}</h3>
            <SortableAttributes attributes={group.attributes} />
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeNodes;
