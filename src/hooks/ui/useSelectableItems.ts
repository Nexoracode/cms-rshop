import { useState, useEffect } from "react";

type Identifiable = { id: number };

export function useSelectableItems<T extends Identifiable>(
  items: T[],
  selectedIdsProp: number[],
) {
  const [selectedMap, setSelectedMap] = useState<Record<number, T>>({});
  const [selectedOrder, setSelectedOrder] = useState<number[]>(selectedIdsProp);

  // ریست انتخاب‌ها وقتی مدال باز می‌شود
  useEffect(() => {
    const initialMap: Record<number, T> = {};
    selectedIdsProp.forEach((id) => {
      const existing = items.find((item) => item.id === id);
      if (existing) initialMap[id] = existing;
    });

    setSelectedOrder(selectedIdsProp);
    setSelectedMap(initialMap);
  }, [selectedIdsProp, items]);

  const handleSelect = (item: T, checked: boolean) => {
    setSelectedOrder((prev) =>
      checked
        ? [...new Set([...prev, item.id])]
        : prev.filter((id) => id !== item.id)
    );

    setSelectedMap((prev) => {
      const copy = { ...prev };
      if (checked) copy[item.id] = item;
      else delete copy[item.id];
      return copy;
    });
  };

  const handleConfirm = (): T[] => {
    return selectedOrder.map((id) => selectedMap[id]).filter(Boolean);
  };

  return {
    selectedMap,
    selectedOrder,
    handleSelect,
    handleConfirm,
    setSelectedMap,
    setSelectedOrder,
  };
}
