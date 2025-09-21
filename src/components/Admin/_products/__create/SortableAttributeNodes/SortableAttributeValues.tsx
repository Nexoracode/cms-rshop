"use client";

import React, { useState, useEffect } from "react";
import { Attribute } from "../attribute-tree ";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { handleDropHelper } from "./handleDropHelper";
import { useDeleteAttributeNode } from "@/hooks/attributes/useVariantProduct";
import { useSearchParams } from "next/navigation";
import { TiDeleteOutline } from "react-icons/ti";

type Props = {
  attribute: Attribute;
};

const SortableAttributeValues: React.FC<Props> = ({ attribute }) => {
  const [items, setItems] = useState(attribute.values);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderValue = useReorderAttributeValue();
  const deleteAttributeNode = useDeleteAttributeNode();
  const searchParams = useSearchParams();

  useEffect(() => {
    setItems(attribute.values);
  }, [attribute]);

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

  const handleDeleteAttributeNode = (valId: number) => {
    const productId = searchParams.get("edit_id");
    if (!productId) return;
    deleteAttributeNode.mutate({
      attributeId: attribute.id,
      productId: +productId,
      valueId: valId,
    });
  };

  return (
    <div className="gap-4 mx-8 my-6">
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
            className={`shadow flex justify-between py-2 px-4 border rounded-xl my-3 cursor-grab hover:bg-slate-50 transition-all`}
            style={{
              borderTop: `1px solid ${val.display_color || "lightgray"}`,
              color: `${val.display_color || "gray"}`,
            }}
          >
            <div className="flex items-center justify-center gap-2 rounded-xl">
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
            <div>
              <TiDeleteOutline
                className="cursor-pointer text-3xl bg-red-50 rounded-xl transition-all hover:scale-110 p-1 text-red-500"
                onClick={() => handleDeleteAttributeNode(val.id)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeValues;
