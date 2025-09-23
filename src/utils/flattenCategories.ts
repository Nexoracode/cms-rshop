export type CategoryNode = { id: number | string; title: string; children?: CategoryNode[] }
export type FlatCategory = { id: number | string; label: string; depth: number }

export function flattenCategories(nodes?: CategoryNode[]): FlatCategory[] {
  const out: FlatCategory[] = []
  const walk = (arr: CategoryNode[], depth = 0) => {
    for (const c of arr) {
      out.push({ id: c.id, label: c.title, depth })
      if (c.children?.length) walk(c.children, depth + 1)
    }
  }
  if (nodes?.length) walk(nodes, 0)
  return out
}
