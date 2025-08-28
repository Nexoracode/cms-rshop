"use client";

import { Card, CardBody, Chip } from "@heroui/react";
import { useState } from "react";
import { TbTrash } from "react-icons/tb";

type Attribute = {
  attr: {
    id: number;
    name: string;
    group?: string;
  };
  values: { id: number; value: string }[];
};

type Props = {
  attributes: Attribute[];
  onDeleteAttribute: (attributeId: number) => void;
  onDeleteAttributeValue: (valueId: number) => void;
  onOrderAttribute: (attribute: Record<string, any>) => void;
  onOrderAttributeValue: (value: Record<string, any>) => void;
};

const AttributeBoxes = ({
  attributes,
  onDeleteAttribute,
  onDeleteAttributeValue,
  onOrderAttribute,
  onOrderAttributeValue,
}: Props) => {
  // --- state های مربوط به attribute ---
  const [dragAttrIndex, setDragAttrIndex] = useState<number | null>(null);
  const [hoverAttrIndex, setHoverAttrIndex] = useState<number | null>(null);

  // --- state های مربوط به attribute value ---
  const [dragVal, setDragVal] = useState<{ attrId: number; valIndex: number } | null>(null);
  const [hoverValIndex, setHoverValIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {attributes.map((item, attrIndex) => (
        <Card
          key={item.attr.id}
          draggable
          onDragStart={() => setDragAttrIndex(attrIndex)}
          onDragOver={(e) => {
            e.preventDefault();
            setHoverAttrIndex(attrIndex);
          }}
          onDrop={() => {
            if (dragAttrIndex === null) return;
            if (hoverAttrIndex === null) return;
            if (dragAttrIndex === hoverAttrIndex) return;

            const { attr } = attributes[dragAttrIndex];
            const { group, ...payload } = attr;
            onOrderAttribute({ ...payload, display_order: hoverAttrIndex });

            setDragAttrIndex(null);
            setHoverAttrIndex(null);
          }}
          className={`p-3 transition-all ${
            hoverAttrIndex === attrIndex ? "ring-2 ring-purple-500" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{item.attr.name}</span>
            <button
              onClick={() => onDeleteAttribute(item.attr.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TbTrash />
            </button>
          </div>

          <CardBody
            className="flex flex-row gap-2 flex-wrap"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (!dragVal) return;
              if (dragVal.attrId !== item.attr.id) return;
              if (hoverValIndex === null) return;
              if (dragVal.valIndex === hoverValIndex) return;

              const val = item.values[dragVal.valIndex];
              //
              const noChangesItem = item.values.filter(attrVal => attrVal.id !== val.id)
              const changeItem = { ...val, display_order: hoverValIndex }
              const arr = [...noChangesItem, changeItem]
              
              onOrderAttributeValue({ ...val, display_order: hoverValIndex });

              setDragVal(null);
              setHoverValIndex(null);
            }}
          >
            {item.values.map((val, valIndex) => (
              <div
                key={val.id}
                draggable
                onDragStart={() =>
                  setDragVal({ attrId: item.attr.id, valIndex })
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  setHoverValIndex(valIndex);
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded-md border cursor-move transition-all ${
                  hoverValIndex === valIndex ? "bg-purple-100" : "bg-gray-50"
                }`}
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
