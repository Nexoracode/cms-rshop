import type { CalendarDate } from "@internationalized/date";

/**
 * CalendarDate → ISO string (در ساعت 00:00:00)
 * اگر ورودی null باشد، undefined برمی‌گرداند.
 */
export const calToISO = (c?: CalendarDate | null): string | undefined => {
  if (!c) return undefined;
  const d = new Date(c.year, c.month - 1, c.day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

export const calToJs = (c?: CalendarDate) =>
  c ? new Date(c.year, c.month - 1, c.day) : undefined;

/**
 * ISO string → CalendarDate
 * در صورت نامعتبر بودن، null برمی‌گرداند.
 */
export const isoToCal = (iso?: string | null): CalendarDate | null => {
  if (!iso) return null;
  try {
    const [year, month, day] = iso.split("T")[0].split("-").map(Number);
    return { year, month, day } as CalendarDate;
  } catch {
    return null;
  }
};
