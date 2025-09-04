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
  const [attrPosition, setAttrPosition] = useState({
    attrId: 0,
    valueId: 0,
    currentPositionAttr: 0,
    currentPositionVal: 0,
  });

  // sync props -> local state
  useEffect(() => {
    console.log(attributes);
    
    setLocalAttributes(attributes);
  }, [attributes]);

  // hooks
  const ReorderAttributeMutation = useReorderAttribute(attrPosition.attrId);
  const ReorderAttributeValueMutation = useReorderAttributeValue(attrPosition.valueId);

  // helper reorder function
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  // reorder attribute after API success
  const reorderAttribute = (newIndex: number) => {
    ReorderAttributeMutation.mutate(
      { display_order: newIndex },
      {
        onSuccess: () => {
          const updated = reorder(localAttributes, attrPosition.currentPositionAttr, newIndex);
          setLocalAttributes(updated);
        },
      }
    );
  };

  // reorder attribute value after API success
  const reorderAttributeValue = (attrIndex: number, newIndex: number) => {
    ReorderAttributeValueMutation.mutate(
      { display_order: newIndex },
      {
        onSuccess: () => {
          const targetAttr = localAttributes[attrIndex];
          const updatedValues = reorder(
            targetAttr.values,
            attrPosition.currentPositionVal,
            newIndex
          );

          const updatedAttrs = [...localAttributes];
          updatedAttrs[attrIndex] = { ...targetAttr, values: updatedValues };
          setLocalAttributes(updatedAttrs);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {localAttributes.map((item, index) => (
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
          onDrop={() => reorderAttribute(index)}
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
            {item.values.map((val, vIndex) => (
              <div
                key={val.id}
                draggable
                onDragStart={() =>
                  setAttrPosition((prev) => ({
                    ...prev,
                    valueId: val.id,
                    currentPositionVal: vIndex,
                  }))
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.stopPropagation();
                  reorderAttributeValue(index, vIndex)
                }}
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
