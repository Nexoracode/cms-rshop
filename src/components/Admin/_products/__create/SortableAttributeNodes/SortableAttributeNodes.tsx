"use client";

import React, { useState, useEffect } from "react";
import { AttributeNode } from "../attribute-tree ";
import SortableAttributes from "./SortableAttributes";
import { useReorderAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { handleDropHelper } from "./handleDropHelper";

type Props = {
  attributeNodes: AttributeNode[];
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes }) => {
  const [items, setItems] = useState(attributeNodes);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderGroup = useReorderAttributeGroup();

  useEffect(() => {
    setItems(attributeNodes);
  }, [attributeNodes]);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => reorderGroup.mutateAsync(payload),
      setItems,
      setDraggingId
    );
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
            className={`mb-6 p-4 shadow-[0_0_15px_#f0f0f0] rounded-2xl ${
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
