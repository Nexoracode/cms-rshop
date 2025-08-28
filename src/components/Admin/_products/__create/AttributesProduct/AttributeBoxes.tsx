"use client";

import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { AiOutlineClose } from "react-icons/ai";

type AttributeValue = {
  id: number;
  value: string;
  attribute_id: number;
  display_color?: string;
  display_order?: number | null;
  is_active?: boolean;
};

type Attribute = {
  attr: {
    id: number;
    name: string;
    slug: string;
    type?: string;
    is_variant?: boolean;
    is_public?: boolean;
    group: {
      id: number;
      name: string;
      slug: string;
      display_order?: number | null;
    };
  };
  values: AttributeValue[];
};

type Props = {
  attributes: Attribute[];
  onDeleteAttribute: (attributeId: number) => void;
  onDeleteAttributeValue: (valueId: number) => void;
  onOrderAttribute: (attributeId: number) => void;
  onOrderAttributeValue: (valueId: number) => void;
};

export default function AttributeBoxes({
  attributes,
  onDeleteAttribute,
  onDeleteAttributeValue,
  onOrderAttribute,
  onOrderAttributeValue
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {attributes.map((item) => (
        <Card
          key={item.attr.id}
          className="p-4 rounded-xl shadow-[0_0_5px_lightgray] transition-shadow duration-300 relative"
        >
          {/* حذف Parent */}
          <div
            className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 text-red-500 hover:bg-red-100 rounded-full cursor-pointer z-10"
            onClick={() => onDeleteAttribute(item.attr.id)}
            title="حذف ویژگی"
          >
            <AiOutlineClose className="w-3 h-3 text-center" />
          </div>

          {/* نام ویژگی */}
          <h3
            className="text-lg mb-3 text-gray-800 pr-4 cursor-pointer"
            onClick={() => onOrderAttribute(item.attr.id)}
          >
            {item.attr.name}{" "}
            <span className="text-sm text-gray-500">
              ({item.attr.group.name})
            </span>
          </h3>

          {/* مقادیر */}
          <CardBody className="flex flex-row gap-2 flex-wrap">
            {item.values.map((val) => (
              <div key={val.id} className="relative">
                <Chip
                  color="secondary"
                  variant="flat"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOrderAttributeValue(val.id);
                  }}
                >
                  {val.value}
                </Chip>

                <div
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-red-500 hover:bg-red-100 rounded-full cursor-pointer z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAttributeValue(val.id);
                  }}
                  title="حذف مقدار"
                >
                  <AiOutlineClose className="w-3 h-3 text-center" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
