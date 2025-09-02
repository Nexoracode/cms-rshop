"use client";

import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { useReorderAttributeValue, useUpdateAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { Card, CardBody, Chip } from "@heroui/react";
import { useState } from "react";
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
  const [attrPosition, setAttrPosition] = useState({
    attrId: 0,
    valueId: 0,
    // Attribute
    currentPositionAttr: 0,
    newPositionAttr: 1,
    // Attribute Value
    currentPositionVal: 0,
    newPositionVal: 1,
  });
  //? Hooks
  const ReorderAttributeMutation = useReorderAttribute(attrPosition.attrId);
  const ReorderAttributeValueMutation = useReorderAttributeValue(attrPosition.valueId);

  // Helper function
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  // Reorder and ApiCall

  const ReorderAttribute = (newPosition: number) => {
    const orderedAttr = {
      display_order: newPosition,
    };
    ReorderAttributeMutation.mutate(orderedAttr, {
      onSuccess: () => {
        
      }
    });
  };
  
  const ReorderAttributeValue = (newPosition: number) => {
    const orderedAttr = {
      display_order: newPosition,
    };
    ReorderAttributeValueMutation.mutate(orderedAttr, {
      onSuccess: () => {

      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {attributes.map((item, index) => (
        <Card
          key={item.attr.id}
          draggable
          onDragStart={() =>
            setAttrPosition((prev) => ({
              ...prev,
              attrId: item.attr.id,
              currentPositionAttr: index,
            }))
          }
          onDragOver={(e) => e.preventDefault()}
          onDrop={() =>
            setAttrPosition((prev) => ({ ...prev, newPositionAttr: index }))
          }
          className="p-3"
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

          <CardBody className="flex flex-row gap-2 flex-wrap">
            {item.values.map((val, index) => (
              <div
                key={val.id}
                draggable
                onDragStart={() =>
                  setAttrPosition((prev) => ({
                    ...prev,
                    valueId: val.id,
                    currentPositionVal: index,
                  }))
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={() =>
                  setAttrPosition((prev) => ({
                    ...prev,
                    newPositionVal: index,
                  }))
                }
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
