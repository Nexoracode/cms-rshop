// utils/buildQueryString.ts
export function buildQueryString(params: Record<string, any>) {
  const qs = new URLSearchParams();
  for (const k in params) {
    const v = params[k];
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
    else qs.append(k, String(v));
  }
  return qs.toString();
}
