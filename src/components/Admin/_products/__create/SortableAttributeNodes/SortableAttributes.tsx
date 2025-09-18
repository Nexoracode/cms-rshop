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
    <div className="mx-8 mt-6">
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
            className={`p-2 shadow-md shadow-sky-200 rounded-2xl border mb-4`}
          >
            <p className="text-lg text-sky-500 border-t border-sky-300 py-2 px-4 bg-sky-50 rounded-xl">{attr.name} <small className="text-black">({attr.type})</small></p>
            <SortableAttributeValues values={attr.values} />
          </div>
        ))}
    </div>
  );
};

export default SortableAttributes;
