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
            className={`mb-6 p-4 shadow-md shadow-purple-300 rounded-2xl border`}
          >
            <h3 className="text-lg text-purple-500 border-t border-purple-300 py-2 px-4 bg-purple-50 rounded-xl">{group.name} <small className="text-black">({group.slug})</small></h3>
            <SortableAttributes attributes={group.attributes} />
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeNodes;
