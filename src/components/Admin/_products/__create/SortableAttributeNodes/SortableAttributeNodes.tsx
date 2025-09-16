// components/SortableAttributeNodes.tsx
"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AttributeNode } from "../attribute-tree ";
import SortableAttributes from "./SortableAttributes";
import { useReorderAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { performSwapAndMutate } from "./reorderSwap";

type Props = {
  attributeNodes: AttributeNode[]; // array from parent
  onChange?: (next: AttributeNode[]) => void; // optional callback
};

const GroupRow: React.FC<{ node: AttributeNode; isBusy?: boolean }> = ({ node, isBusy }) => {
  // simple display row (no nested drag handlers here)
  return (
    <div className={`mb-4 p-3 border rounded bg-white ${isBusy ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <strong>{node.name}</strong>
          <div className="text-sm text-gray-500">id: {node.id}</div>
        </div>
        <div className="text-sm text-gray-600">order: {String(node.display_order ?? "-")}</div>
      </div>
    </div>
  );
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes, onChange }) => {
  const [nodes, setNodes] = useState<AttributeNode[]>(attributeNodes);
  const [busy, setBusy] = useState(false);
  const reorderGroup = useReorderAttributeGroup(); // assumes mutateAsync available

  const sensors = useSensors(useSensor(PointerSensor));

  // update local nodes if parent prop changes
  React.useEffect(() => {
    setNodes(attributeNodes);
  }, [attributeNodes]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const activeId = Number(event.active.id);
    const overId = Number(event.over?.id);
    if (!overId || activeId === overId) return;

    try {
      await performSwapAndMutate({
        items: nodes.map((n) => ({ ...n, id: n.id, display_order: n.display_order })),
        activeId,
        overId,
        mutateFn: ({ id, display_order }) => reorderGroup.mutateAsync({ id, display_order }),
        setLocalState: (next) => {
          // next is generic ItemWithOrder[]; cast back to AttributeNode[]
          setNodes(next as AttributeNode[]);
          onChange?.(next as AttributeNode[]);
        },
        setIsBusy: setBusy,
      });
    } catch (err) {
      // error UI if needed
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={nodes.map((n) => String(n.id))} strategy={verticalListSortingStrategy}>
        {nodes.map((node) => (
          <div key={node.id} id={String(node.id)}>
            <GroupRow node={node} isBusy={busy} />
            {/* داخل هر گروه: لیست attribute ها (سطح دوم) */}
            <SortableAttributes
              attributes={node.attributes}
              parentGroupId={node.id}
              onAttributesChange={(nextAttrs) => {
                // update group's attributes in local state
                setNodes((prev) => prev.map((g) => (g.id === node.id ? { ...g, attributes: nextAttrs } : g)));
                onChange?.(nodes);
              }}
            />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableAttributeNodes;
