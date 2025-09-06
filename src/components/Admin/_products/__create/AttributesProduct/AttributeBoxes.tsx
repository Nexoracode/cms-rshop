"use client";

import { useReorderAttribute } from "@/hooks/attributes/useAttribute";
import { useReorderAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { Card, CardBody, Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
//
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

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
    console.log(attributes);
    
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


/* 

"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const groups = [
  {
    id: "group1",
    name: "مشخصات کلی",
    attributes: [
      {
        id: "attr1",
        name: "نوع گوشی موبایل",
        values: [
          { id: "val1", name: "اندروید" },
          { id: "val2", name: "iOS" },
          { id: "val3", name: "HarmonyOS" },
        ],
      },
      {
        id: "attr2",
        name: "دسته‌بندی",
        values: [
          { id: "val4", name: "میان‌رده" },
          { id: "val5", name: "پرچمدار" },
          { id: "val6", name: "اقتصادی" },
        ],
      },
      {
        id: "attr3",
        name: "سال تولید",
        values: [
          { id: "val7", name: "۲۰۲۳" },
          { id: "val8", name: "۲۰۲۴" },
          { id: "val9", name: "۲۰۲۵" },
        ],
      },
    ],
  },
  {
    id: "group2",
    name: "مدل",
    attributes: [
      {
        id: "attr4",
        name: "Redmi Note ۱۳ ۴G",
        values: [
          { id: "val10", name: "128GB" },
          { id: "val11", name: "256GB" },
        ],
      },
      {
        id: "attr5",
        name: "iPhone 15 Pro",
        values: [
          { id: "val12", name: "128GB" },
          { id: "val13", name: "256GB" },
          { id: "val14", name: "512GB" },
        ],
      },
    ],
  },
  {
    id: "group3",
    name: "مشخصات فنی",
    attributes: [
      {
        id: "attr6",
        name: "پردازنده",
        values: [
          { id: "val15", name: "Snapdragon 8 Gen 2" },
          { id: "val16", name: "Apple A17 Pro" },
          { id: "val17", name: "Dimensity 9200" },
        ],
      },
      {
        id: "attr7",
        name: "رم (RAM)",
        values: [
          { id: "val18", name: "6GB" },
          { id: "val19", name: "8GB" },
          { id: "val20", name: "12GB" },
          { id: "val21", name: "16GB" },
        ],
      },
      {
        id: "attr8",
        name: "باتری",
        values: [
          { id: "val22", name: "4000mAh" },
          { id: "val23", name: "5000mAh" },
          { id: "val24", name: "6000mAh" },
        ],
      },
    ],
  },
  {
    id: "group4",
    name: "طراحی و رنگ",
    attributes: [
      {
        id: "attr9",
        name: "رنگ",
        values: [
          { id: "val25", name: "مشکی" },
          { id: "val26", name: "نقره‌ای" },
          { id: "val27", name: "آبی" },
          { id: "val28", name: "سبز" },
        ],
      },
      {
        id: "attr10",
        name: "جنس بدنه",
        values: [
          { id: "val29", name: "شیشه" },
          { id: "val30", name: "پلاستیک" },
          { id: "val31", name: "آلومینیوم" },
        ],
      },
    ],
  },
  {
    id: "group5",
    name: "ابعاد و وزن",
    attributes: [
      {
        id: "attr11",
        name: "وزن",
        values: [
          { id: "val32", name: "150g" },
          { id: "val33", name: "180g" },
          { id: "val34", name: "200g" },
        ],
      },
      {
        id: "attr12",
        name: "ضخامت",
        values: [
          { id: "val35", name: "7.5mm" },
          { id: "val36", name: "8.0mm" },
          { id: "val37", name: "8.5mm" },
        ],
      },
    ],
  },
];


export default function AttributeTree() {
  const [data, setData] = useState(groups);
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    // درگ گروه
    let oldIndex = data.findIndex((g) => g.id === active.id);
    let newIndex = data.findIndex((g) => g.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const newData = arrayMove(data, oldIndex, newIndex);
      setData(newData);
      setActiveItem(null);

      console.log("📦 گروه‌ها بعد از تغییر:", newData.map((g, i) => ({ id: g.id, display_order: i })));
      return;
    }

    // درگ attribute
    data.forEach((g, gIndex) => {
      oldIndex = g.attributes.findIndex((a) => a.id === active.id);
      newIndex = g.attributes.findIndex((a) => a.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newAttrs = arrayMove(g.attributes, oldIndex, newIndex);
        const newData = [...data];
        newData[gIndex] = { ...g, attributes: newAttrs };
        setData(newData);
        setActiveItem(null);

        console.log(`⚡️ اتریبیوت‌های گروه ${g.name}:`, newAttrs.map((a, i) => ({ id: a.id, display_order: i })));
      }
      // درگ value
      g.attributes.forEach((a, aIndex) => {
        oldIndex = a.values.findIndex((v) => v.id === active.id);
        newIndex = a.values.findIndex((v) => v.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const newVals = arrayMove(a.values, oldIndex, newIndex);
          const newData = [...data];
          newData[gIndex].attributes[aIndex] = { ...a, values: newVals };
          setData(newData);
          setActiveItem(null);

          console.log(`🔹 مقادیر اتریبیوت ${a.name}:`, newVals.map((v, i) => ({ id: v.id, display_order: i })));
        }
      });
    });
  };

  const findItem = (id: string) => {
    for (let g of data) {
      if (g.id === id) return g;
      for (let a of g.attributes) {
        if (a.id === id) return a;
        for (let v of a.values) {
          if (v.id === id) return v;
        }
      }
    }
    return null;
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(e: any) => setActiveItem(findItem(e.active.id))}
    >
      <SortableContext
        items={data.map((g) => g.id)}
        strategy={verticalListSortingStrategy}
      >
        {data.map((g, gIndex) => (
          <Item
            key={g.id}
            item={g}
            level={0}
            parentIndexes={{ gIndex }}
            data={data}
            setData={setData}
          />
        ))}
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="bg-white shadow-[0_0_8px_lightgray] rounded-lg p-3 cursor-grabbing">
            {activeItem.name}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

function Item({ item, level }: any) {
  const { setNodeRef, listeners, transform, transition } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        marginLeft: level * 20,
      }}
      className={`bg-white shadow-[0_0_8px_lightgray] rounded-lg p-3 cursor-grab ${
        level === 3 ? "w-fit py-2 inline-block mt-5 !mx-2" : "m-4"
      }`}
    >
      <p>{item.name}</p>
      {item.attributes &&
        item.attributes.map((a: any, aIndex: number) => (
          <Item key={a.id} item={a} level={level + 1} />
        ))}
      {item.values &&
        item.values.map((v: any, vIndex: number) => (
          <Item key={v.id} item={v} level={level + 2} />
        ))}
    </div>
  );
}


*/