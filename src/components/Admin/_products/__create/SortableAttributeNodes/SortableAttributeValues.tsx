"use client";

import React, { useState, useEffect } from "react";
import { AttributeValue } from "../attribute-tree ";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { handleDropHelper } from "./handleDropHelper";

type Props = {
  values: AttributeValue[];
};

const SortableAttributeValues: React.FC<Props> = ({ values }) => {
  const [items, setItems] = useState(values);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderValue = useReorderAttributeValue();

  useEffect(() => {
    setItems(values);
  }, [values]);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => reorderValue.mutateAsync(payload),
      setItems,
      setDraggingId
    );
  };

  return (
    <div className="ml-4 mt-1">
      {items
        .slice()
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((val) => (
          <div
            key={val.id}
            draggable
            onDragStart={() => handleDragStart(val.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(val.id)}
            className={`p-3 shadow-[0_0_15px_#f0f0f0] rounded-xl my-2 ${
              draggingId === val.id ? "bg-purple-100" : ""
            }`}
          >
            {val.value}
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeValues;
