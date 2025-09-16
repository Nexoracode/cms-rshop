"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string | number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const SortableItem: React.FC<Props> = ({ id, children, className = "", style }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: String(id) });

  const itemStyle: React.CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    touchAction: "manipulation",
    ...style,
  };

  return (
    <div ref={setNodeRef} style={itemStyle} className={`${className} ${isDragging ? "z-20 shadow-lg" : ""}`} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
