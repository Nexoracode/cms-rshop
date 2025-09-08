export function replaceOrAddById(array: Record<string, any>[], item: Record<string, any>) {
  const index = array.findIndex((a) => (a.id === item.id));
  if (index !== -1) {
    const updated = [...array];
    updated[index] = item;
    return updated;
  }
  return [...array, item];
}
