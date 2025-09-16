// components/SortableAttributes.tsx
"use client";

import React, { useEffect, useState } from "react";
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
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Attribute } from "../attribute-tree ";
import SortableAttributeValues from "./SortableAttributeValues";
import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { performSwapAndMutate } from "./reorderSwap";

type Props = {
  attributes: Attribute[];
  parentGroupId?: number;
  onAttributesChange?: (next: Attribute[]) => void;
};

const SortableRow: React.FC<{ attr: Attribute; disabled?: boolean }> = ({ attr, disabled }) => {
  return (
    <div className={`mb-2 p-2 border rounded bg-white ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <strong>{attr.name}</strong> <span className="text-xs">({attr.type})</span>
          <div className="text-xs text-gray-500">id: {attr.id}</div>
        </div>
        <div className="text-xs text-gray-600">order: {String(attr.display_order ?? "-")}</div>
      </div>
    </div>
  );
};

const SortableAttributes: React.FC<Props> = ({ attributes, parentGroupId, onAttributesChange }) => {
  const [items, setItems] = useState<Attribute[]>(attributes);
  const [busy, setBusy] = useState(false);
  const reorderAttr = useReorderAttribute();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setItems(attributes);
  }, [attributes]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const activeId = Number(event.active.id);
    const overId = Number(event.over?.id);
    if (!overId || activeId === overId) return;

    try {
      await performSwapAndMutate({
        items,
        activeId,
        overId,
        mutateFn: ({ id, display_order }) => reorderAttr.mutateAsync({ id, display_order }),
        setLocalState: (next) => {
          const cast = next as Attribute[];
          setItems(cast);
          onAttributesChange?.(cast);
        },
        setIsBusy: setBusy,
      });
    } catch (err) {
      // error
    }
  };

  return (
    <div className="ml-4 mt-2">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => String(i.id))} strategy={verticalListSortingStrategy}>
          {items.map((attr) => (
            <div key={attr.id} id={String(attr.id)}>
              <SortableRow attr={attr} disabled={busy} />
              {/* داخل هر attribute: values (سطح سوم) */}
              <SortableAttributeValues
                values={attr.values}
                parentAttributeId={attr.id}
                onValuesChange={(nextValues) => {
                  setItems((prev) => prev.map((a) => (a.id === attr.id ? { ...a, values: nextValues } : a)));
                  onAttributesChange?.(items);
                }}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SortableAttributes;
