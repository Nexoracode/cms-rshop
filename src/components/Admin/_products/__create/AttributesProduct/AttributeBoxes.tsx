"use client";

import { Card, CardBody, Chip } from "@heroui/react";
import { TbTrash } from "react-icons/tb";

type Attribute = {
  attr: Record<string, any>;
  values: Record<string, any>[];
};

type Props = {
  attributes: Attribute[];
  onDeleteAttribute: (attributeId: number) => void;
  onDeleteAttributeValue: (valueId: number) => void;
};

const AttributeBoxes = ({
  attributes,
  onDeleteAttribute,
  onDeleteAttributeValue,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {attributes.map((item) => (
        <Card key={item.attr.id} className="p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{item.attr.name}</span>
            <button
              onClick={() => onDeleteAttribute(item.attr.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TbTrash />
            </button>
          </div>

          <CardBody className="flex flex-row gap-2 flex-wrap">
            {item.values.map((val) => (
              <div
                key={val.id}
                className="flex items-center gap-1 px-2 py-1 rounded-md border bg-gray-50"
              >
                <Chip>{val.value}</Chip>
                <button
                  onClick={() => onDeleteAttributeValue(val.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TbTrash />
                </button>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AttributeBoxes;
