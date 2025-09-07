// utils/cartesian.ts
export function cartesian(arrays: any[][]) {
  return arrays.reduce(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]]
  );
}
