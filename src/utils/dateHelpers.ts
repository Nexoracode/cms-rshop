import { CalendarDate } from "@internationalized/date";

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

export const isoToCal = (iso?: string | null): CalendarDate | undefined => {
  if (!iso) return undefined;
  try {
    const [year, month, day] = iso.split("T")[0].split("-").map(Number);
    return new CalendarDate(year, month, day); // ⚡ اینجا
  } catch {
    return undefined;
  }
};