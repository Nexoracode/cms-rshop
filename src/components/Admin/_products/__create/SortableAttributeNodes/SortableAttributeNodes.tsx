"use client";

import React, { useState } from "react";
import { AttributeNode } from "../attribute-tree ";
import SortableAttributes from "./SortableAttributes";

type Props = {
  attributeNodes: AttributeNode[];
  onChange?: (next: AttributeNode[]) => void;
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes, onChange }) => {
  const [nodes, setNodes] = useState([...attributeNodes]);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const sortedNodes = [...nodes].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const handleMouseDown = (id: number) => setDraggingId(id);
  const handleMouseUp = (overId: number) => {
    if (draggingId === null || draggingId === overId) return;
    const idxA = nodes.findIndex((n) => n.id === draggingId);
    const idxB = nodes.findIndex((n) => n.id === overId);
    if (idxA === -1 || idxB === -1) return;

    const newNodes = [...nodes];
    const tmp = newNodes[idxA];
    newNodes[idxA] = { ...newNodes[idxB], display_order: newNodes[idxA].display_order };
    newNodes[idxB] = { ...tmp, display_order: newNodes[idxB].display_order };

    setNodes(newNodes);
    onChange?.(newNodes);
    setDraggingId(null);
  };

  const handleAttributesChange = (groupId: number, nextAttrs: any[]) => {
    const newNodes = nodes.map((n) => (n.id === groupId ? { ...n, attributes: nextAttrs } : n));
    setNodes(newNodes);
    onChange?.(newNodes);
  };

  return (
    <div>
      {sortedNodes.map((group) => (
        <div
          key={group.id}
          onMouseDown={() => handleMouseDown(group.id)}
          onMouseUp={() => handleMouseUp(group.id)}
          className={`mb-4 p-3 border rounded bg-white ${
            draggingId === group.id ? "opacity-50 border-red-500" : ""
          }`}
        >
          <strong>{group.name}</strong>
          <span className="text-xs text-gray-500 ml-2">order: {group.display_order}</span>

          <SortableAttributes
            attributes={group.attributes}
            onAttributesChange={(nextAttrs) => handleAttributesChange(group.id, nextAttrs)}
          />
        </div>
      ))}
    </div>
  );
};

export default SortableAttributeNodes;
