import { CalendarDate } from "@internationalized/date";

/**
 * CalendarDate → ISO string (در ساعت 00:00:00)
 */
export const calToISO = (c?: CalendarDate | null): string | undefined => {
  if (!c) return undefined;
  const d = new Date(c.year, c.month - 1, c.day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

/**
 * CalendarDate → JS Date
 */
export const calToJs = (c?: CalendarDate) =>
  c ? new Date(c.year, c.month - 1, c.day) : undefined;

/**
 * ISO string → CalendarDate (با درنظر گرفتن timezone محلی)
 */
export const isoToCal = (iso?: string | null): CalendarDate | undefined => {
  if (!iso) return undefined;
  try {
    // اینجا Date رو parse می‌کنیم تا timezone لحاظ بشه
    const d = new Date(iso);
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  } catch {
    return undefined;
  }
};
