"use client";

import React, { useState } from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import { AiOutlineClose } from "react-icons/ai";

const initialAttributes = [
  {
    name: "رنگ",
    values: ["زرد", "آبی"],
  },
  {
    name: "کامپیوتر",
    values: ["مادربورد", "رم", "منبع تغذیه"],
  },
];

export default function AttributeBoxes() {
  const [attributes, setAttributes] = useState(initialAttributes);

  // حذف کل باکس (Parent)
  const removeAttributeBox = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  // حذف یک مقدار (Child)
  const removeAttributeValue = (parentIndex: number, childIndex: number) => {
    setAttributes((prev) =>
      prev.map((attr, i) =>
        i === parentIndex
          ? { ...attr, values: attr.values.filter((_, j) => j !== childIndex) }
          : attr
      )
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {attributes.map((attr, parentIndex) => (
        <Card
          key={attr.name}
          className="p-4 rounded-xl shadow-[0_0_5px_lightgray] transition-shadow duration-300 relative"
        >
          {/* دکمه حذف Parent */}
          <div
            className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 text-red-500 hover:bg-red-100 rounded-full cursor-pointer"
            onClick={() => removeAttributeBox(parentIndex)}
          >
            <AiOutlineClose className="w-3 h-3 text-center" />
          </div>

          <h3 className="text-lg mb-3 text-gray-800 pr-4">{attr.name}</h3>
          <CardBody className="flex flex-row gap-2 flex-wrap">
            {attr.values.map((val, childIndex) => (
              <div key={val} className="relative">
                <Chip
                  color="secondary"
                  variant="flat"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                >
                  {val}
                </Chip>
                {/* دکمه حذف Child */}
                <div
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-red-500 hover:bg-red-100 rounded-full cursor-pointer"
                  onClick={() => removeAttributeValue(parentIndex, childIndex)}
                >
                  <AiOutlineClose className="w-3 h-3 text-center" />
                </div>
              </div>
            ))}
          </CardBody>
          <small className="mt-3 text-gray-500 -mb-2">
            برای ترتیب باکس ها روی باکس موردنظر کلیک کنید
          </small>
        </Card>
      ))}
    </div>
  );
}
