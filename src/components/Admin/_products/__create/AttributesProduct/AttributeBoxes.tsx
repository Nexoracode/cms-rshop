// AttributeBoxes.tsx
"use client";

import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { AiOutlineClose } from "react-icons/ai";

type AttributeValue = {
  id: number;
  value: string;
  attribute_id?: number;
  // ... ممکن است فیلدهای دیگر هم وجود داشته باشد
};

type Attribute = {
  id: number;
  name: string;
  values: AttributeValue[]; // آرایه ابجکت‌ها (نه فقط رشته)
  // ... فیلدهای دیگر
};

type Props = {
  attributes: Attribute[]; // از والد پاس داده میشود
  onDeleteAttribute: (attributeId: number) => void; // حذف parent
  onDeleteAttributeValue: (attributeId: number, valueId: number) => void; // حذف value
  onMoveAttributeToTop: (attributeId: number) => void; // درخواست جابه‌جایی parent
  onMoveValueToTop: (attributeId: number, valueId: number) => void; // درخواست جابه‌جایی value
};

export default function AttributeBoxes({
  attributes,
  onDeleteAttribute,
  onDeleteAttributeValue,
  onMoveAttributeToTop,
  onMoveValueToTop,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {attributes.map((attr) => (
        <Card
          key={attr.id}
          className="p-4 rounded-xl shadow-[0_0_5px_lightgray] transition-shadow duration-300 relative"
        >
          {/* دکمه حذف Parent */}
          <div
            className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 text-red-500 hover:bg-red-100 rounded-full cursor-pointer z-10"
            onClick={() => onDeleteAttribute(attr.id)}
            title="حذف گروه"
          >
            <AiOutlineClose className="w-3 h-3 text-center" />
          </div>

          {/* نام Parent قابل کلیک */}
          <h3
            className="text-lg mb-3 text-gray-800 pr-4 cursor-pointer"
            onClick={() => onMoveAttributeToTop(attr.id)}
          >
            {attr.name}
          </h3>

          <CardBody className="flex flex-row gap-2 flex-wrap">
            {attr.values.map((val) => (
              <div key={val.id} className="relative">
                {/* Chip قابل کلیک برای جابه‌جایی Child */}
                <Chip
                  color="secondary"
                  variant="flat"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از trigger شدن کلیک نام parent
                    onMoveValueToTop(attr.id, val.id);
                  }}
                >
                  {val.value}
                </Chip>

                {/* دکمه حذف Child */}
                <div
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-red-500 hover:bg-red-100 rounded-full cursor-pointer z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAttributeValue(attr.id, val.id);
                  }}
                  title="حذف مقدار"
                >
                  <AiOutlineClose className="w-3 h-3 text-center" />
                </div>
              </div>
            ))}
          </CardBody>

          <small className="mt-3 text-gray-500 -mb-2">
            برای ترتیب باکس ها روی نام گروه و برای ترتیب مقادیر روی مقدار کلیک کنید
          </small>
        </Card>
      ))}
    </div>
  );
}
