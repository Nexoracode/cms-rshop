// components/SortableAttributeNodes.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AttributeNode, Attribute, AttributeValue } from "../attribute-tree ";
import SortableItem from "./SortableItem";
import SortableAttributes from "./SortableAttributes";
import { performSwapAndMutate, ItemWithOrder } from "./reorderSwap"
import { useReorderAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";

type Props = {
  attributeNodes: AttributeNode[];
  onChange?: (next: AttributeNode[]) => void;
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes, onChange }) => {
  const [nodes, setNodes] = useState<AttributeNode[]>(attributeNodes);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reorderGroup = useReorderAttributeGroup();
  const reorderAttr = useReorderAttribute();
  const reorderValue = useReorderAttributeValue();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => setNodes(attributeNodes), [attributeNodes]);

  // helpers: find where an id belongs
  const findGroupByAttributeId = (attrId: number) => nodes.find((g) => g.attributes.some((a) => a.id === attrId));
  const findAttributeByValueId = (valueId: number) => {
    for (const g of nodes) {
      const a = g.attributes.find((at) => at.values.some((v) => v.id === valueId));
      if (a) return { group: g, attribute: a };
    }
    return null;
  };

  const handleDragStart = (event: any) => {
    setActiveOverlay(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveOverlay(null);
    const activeIdNum = event.active ? Number(event.active.id) : null;
    const overIdNum = event.over ? Number(event.over.id) : null;
    if (!activeIdNum || !overIdNum || activeIdNum === overIdNum) return;

    // 1) are both group ids?
    const groupIds = nodes.map((n) => n.id);
    if (groupIds.includes(activeIdNum) && groupIds.includes(overIdNum)) {
      // swap groups
      try {
        await performSwapAndMutate({
          items: nodes.map((n) => ({ id: n.id, display_order: n.display_order } as ItemWithOrder)),
          activeId: activeIdNum,
          overId: overIdNum,
          mutateFn: ({ id, display_order }) => reorderGroup.mutateAsync({ id, display_order }),
          setLocalState: (next) => {
            // next is ItemWithOrder[]; map back to AttributeNode[] keeping attributes
            const nextNodes = (next as ItemWithOrder[]).map((it) => {
              const original = nodes.find((n) => n.id === it.id)!;
              return { ...original, display_order: it.display_order };
            });
            setNodes(nextNodes);
            onChange?.(nextNodes);
          },
          setIsBusy: setBusy,
        });
      } catch (err) {
        console.error("Group swap failed", err);
      }
      return;
    }

    // 2) are both attribute ids within the same group?
    // find parent groups for each attribute
    const groupA = findGroupByAttributeId(activeIdNum);
    const groupB = findGroupByAttributeId(overIdNum);
    if (groupA && groupB && groupA.id === groupB.id) {
      const attributes = groupA.attributes;
      try {
        await performSwapAndMutate({
          items: attributes.map((a) => ({ id: a.id, display_order: a.display_order } as ItemWithOrder)),
          activeId: activeIdNum,
          overId: overIdNum,
          mutateFn: ({ id, display_order }) => reorderAttr.mutateAsync({ id, display_order }),
          setLocalState: (next) => {
            const nextAttrs = (next as ItemWithOrder[]).map((it) => {
              const orig = attributes.find((a) => a.id === it.id)!;
              return { ...orig, display_order: it.display_order };
            });
            const nextNodes = nodes.map((g) => (g.id === groupA.id ? { ...g, attributes: nextAttrs } : g));
            setNodes(nextNodes);
            onChange?.(nextNodes);
          },
          setIsBusy: setBusy,
        });
      } catch (err) {
        console.error("Attribute swap failed", err);
      }
      return;
    }

    // 3) are both value ids within the same attribute?
    const findA = findAttributeByValueId(activeIdNum);
    const findB = findAttributeByValueId(overIdNum);
    if (findA && findB && findA.attribute.id === findB.attribute.id) {
      const parentAttr = findA.attribute;
      try {
        await performSwapAndMutate({
          items: parentAttr.values.map((v) => ({ id: v.id, display_order: v.display_order } as ItemWithOrder)),
          activeId: activeIdNum,
          overId: overIdNum,
          mutateFn: ({ id, display_order }) => reorderValue.mutateAsync({ id, display_order }),
          setLocalState: (next) => {
            const nextVals = (next as ItemWithOrder[]).map((it) => {
              const orig = parentAttr.values.find((v) => v.id === it.id)!;
              return { ...orig, display_order: it.display_order };
            });
            const nextNodes = nodes.map((g) => ({
              ...g,
              attributes: g.attributes.map((a) => (a.id === parentAttr.id ? { ...a, values: nextVals } : a)),
            }));
            setNodes(nextNodes);
            onChange?.(nextNodes);
          },
          setIsBusy: setBusy,
        });
      } catch (err) {
        console.error("Value swap failed", err);
      }
      return;
    }

    // else -> different parents or mixed types => do nothing
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={nodes.map((n) => String(n.id))} strategy={verticalListSortingStrategy}>
        {nodes.map((node) => (
          <div key={node.id} id={String(node.id)} className="mb-6 p-4 border rounded">
            <SortableItem id={node.id} className="mb-3">
              <div className={`flex items-center justify-between`}>
                <div>
                  <strong>{node.name}</strong>
                  <div className="text-sm text-gray-500">id: {node.id}</div>
                </div>
                <div className="text-xs text-gray-600">order: {String(node.display_order ?? "-")}</div>
              </div>
            </SortableItem>

            <SortableAttributes
              attributes={node.attributes}
              parentGroupId={node.id}
              onAttributesChange={(next) => {
                setNodes((prev) => prev.map((g) => (g.id === node.id ? { ...g, attributes: next } : g)));
                onChange?.(nodes);
              }}
            />
          </div>
        ))}
      </SortableContext>

      <DragOverlay>
        {activeOverlay ? (
          <div className="p-3 bg-white border rounded shadow">در حال کشیدن...</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableAttributeNodes;
