export const findItemById = (items: any[], id: number | string): any | null => {
  console.log("items =>", items);

  for (const item of items) {
    if (item.id === id) return item;

    if (item.children && item.children.length) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};
