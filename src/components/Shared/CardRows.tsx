"use client";

import React from "react";

type RowItem = {
  label: string;
  value: string | number;
};

type Props = {
  items: RowItem[];
};

const CardRows: React.FC<Props> = ({ items }) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200 rounded-lg overflow-hidden">
      {items.map((row, index) => (
        <div
          key={index}
          className={`flex border-none justify-between items-center rounded-xl px-3 py-2 text-sm ${
            index % 2 === 1 ? "bg-slate-100" : "bg-white"
          }`}
        >
          <span>{row.label}:</span>
          <span className="font-medium text-gray-600">{row.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CardRows;
