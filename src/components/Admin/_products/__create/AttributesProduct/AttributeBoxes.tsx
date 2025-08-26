"use client";

import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";

const attributes = [
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
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {attributes.map((attr) => (
        <Card
          key={attr.name}
          className="p-4 rounded-xl shadow-[0_0_5px_lightgray] transition-shadow duration-300"
        >
          <h3 className="text-lg mb-3 text-gray-800">
            {attr.name}
          </h3>
          <CardBody className="flex flex-row gap-2">
            {attr.values.map((val) => (
              <Chip
                key={val}
                color="secondary"
                variant="flat"
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                {val}
              </Chip>
            ))}
          </CardBody>
         <small className="mt-3 text-gray-500 -mb-2">برای ترتیب باکس ها روی باکس موردنظر کلیک کنید</small>
        </Card>
      ))}
    </div>
  );
}
