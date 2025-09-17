"use client";

import React, { useState, useEffect } from "react";
import { Attribute } from "../attribute-tree ";
import SortableAttributeValues from "./SortableAttributeValues";
import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { handleDropHelper } from "./handleDropHelper";

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
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => reorderAttribute.mutateAsync(payload),
      setItems,
      setDraggingId
    );
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
            className={`mb-2 p-2 shadow-[0_0_15px_#f0f0f0] rounded-2xl ${
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
