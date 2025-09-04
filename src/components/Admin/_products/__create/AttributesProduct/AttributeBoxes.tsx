"use client";

import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { Card, CardBody, Chip } from "@heroui/react";
import { useEffect, useState } from "react";
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
  const [localAttributes, setLocalAttributes] = useState<Attribute[]>([]);
  const [dragInfo, setDragInfo] = useState({
    attrId: 0,
    valueId: 0,
    startAttrIndex: 0,
    startValueIndex: 0,
  });

  useEffect(() => {
    setLocalAttributes(attributes);
  }, [attributes]);

  useEffect(() => {
    console.log(localAttributes);
  }, [localAttributes]);

  const ReorderAttributeMutation = useReorderAttribute();
  const ReorderAttributeValueMutation = useReorderAttributeValue();

  // swap Attributes UI + API
  const swapAttributes = (targetIndex: number) => {
    const startIndex = dragInfo.startAttrIndex;
    if (startIndex === targetIndex) return;

    const newAttrs = [...localAttributes];
  };

  // swap Attribute Values UI + API
  const swapAttributeValues = (parentIndex: number, targetIndex: number) => {
    const startIndex = dragInfo.startValueIndex;
    if (startIndex === targetIndex) return;

    const newAttrs = [...localAttributes];
    const values = [...newAttrs[parentIndex].values];
  };

  return (
    <div className="flex flex-col gap-4">
      {localAttributes
        .sort((a, b) => a.attr.display_order - b.attr.display_order)
        .map((attr, attrIndex) => (
          <Card
            key={attr.attr.id}
            draggable
            onDragStart={() =>
              setDragInfo({
                attrId: attr.attr.id,
                valueId: 0,
                startAttrIndex: attrIndex,
                startValueIndex: 0,
              })
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => swapAttributes(attrIndex)}
            className="p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{attr.attr.name}</span>
              <button
                onClick={() => onDeleteAttribute(attr.attr.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TbTrash />
              </button>
            </div>

            <CardBody className="flex flex-row gap-2 flex-wrap">
              {attr.values.map((val, valIndex) => (
                <div
                  key={val.id}
                  draggable
                  onDragStart={() =>
                    setDragInfo({
                      attrId: attr.attr.id,
                      valueId: val.id,
                      startAttrIndex: attrIndex,
                      startValueIndex: valIndex,
                    })
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.stopPropagation();
                    if (dragInfo.attrId !== attr.attr.id) return;
                    swapAttributeValues(attrIndex, valIndex);
                  }}
                  onDragEnd={() =>
                    setDragInfo((prev) => ({
                      ...prev,
                      valueId: 0,
                      startValueIndex: 0,
                    }))
                  }
                  className="flex items-center gap-1 px-2 py-1 rounded-full cursor-grab border bg-gray-50"
                >
                  <Chip color="secondary" variant="flat">
                    {val.value}
                  </Chip>
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
