// components/SortableAttributeValues.tsx
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
} from "@dnd-kit/sortable";
import { AttributeValue } from "../attribute-tree ";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { performSwapAndMutate } from "./reorderSwap";

type Props = {
  values: AttributeValue[];
  parentAttributeId?: number;
  onValuesChange?: (next: AttributeValue[]) => void;
};

const ValueRow: React.FC<{ val: AttributeValue; disabled?: boolean }> = ({ val, disabled }) => {
  return (
    <div className={`p-1 border rounded mb-1 bg-white ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm">{val.value}</div>
        <div className="text-xs text-gray-500">order: {String(val.display_order ?? "-")}</div>
      </div>
    </div>
  );
};

const SortableAttributeValues: React.FC<Props> = ({ values, parentAttributeId, onValuesChange }) => {
  const [items, setItems] = useState<AttributeValue[]>(values);
  const [busy, setBusy] = useState(false);
  const reorderValue = useReorderAttributeValue();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setItems(values);
  }, [values]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const activeId = Number(event.active.id);
    const overId = Number(event.over?.id);
    if (!overId || activeId === overId) return;

    try {
      await performSwapAndMutate({
        items,
        activeId,
        overId,
        mutateFn: ({ id, display_order }) => reorderValue.mutateAsync({ id, display_order }),
        setLocalState: (next) => {
          const cast = next as AttributeValue[];
          setItems(cast);
          onValuesChange?.(cast);
        },
        setIsBusy: setBusy,
      });
    } catch (err) {
      // error
    }
  };

  return (
    <div className="ml-4 mt-1">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((v) => String(v.id))} strategy={verticalListSortingStrategy}>
          {items.map((val) => (
            <div key={val.id} id={String(val.id)}>
              <ValueRow val={val} disabled={busy} />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SortableAttributeValues;
