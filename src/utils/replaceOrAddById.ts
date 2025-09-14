export function replaceOrAddById<T extends { id: string | number }>(
  array: T[],
  item: T
): T[] {
  const index = array.findIndex((a) => a.id === item.id);
  if (index !== -1) {
    const updated = [...array];
    updated[index] = item;
    return updated;
  }
  return [...array, item];
}

export function mergeOrAddAttribute<
  T extends { id: string | number; values?: any[] }
>(array: T[], item: T): T[] {
  const index = array.findIndex((a) => a.id === item.id);

  if (index !== -1) {
    const existing = array[index];

    const existingValues = existing.values ?? [];
    const newValues = item.values ?? [];

    const mergedValues = [
      ...existingValues,
      ...newValues.filter(
        (nv) => !existingValues.some((ev) => ev.id === nv.id)
      ),
    ];

    const updated = [...array];
    updated[index] = {
      ...existing,
      ...item,
      values: mergedValues,
    };

    return updated;
  }

  return [...array, item];
}
