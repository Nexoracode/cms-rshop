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
    <div className="flex flex-wrap items-center gap-4 mx-8">
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
            className={`w-fit shadow-md rounded-xl my-2.5 cursor-grab`}
          >
            <div
              className="flex items-center gap-2 py-3 px-4 rounded-xl"
              style={{ borderTop: `1px solid ${val.display_color || "lightgray"}`, color: `${val.display_color || "gray"}`}}
            >
              {val.display_color && (
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{
                    backgroundColor: val.display_color,
                  }}
                />
              )}
              <p className="text-[16px]">{val.value}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeValues;
