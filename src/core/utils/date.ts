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

export const toPersianUTC = (isoDate?: string | null) =>
  isoDate
    ? new Date(isoDate).toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })
    : "—";

/**
 * تبدیل تاریخ به فرمت زیبای فارسی
 * مثال خروجی: چهارشنبه ۱۴ آذر ۱۴۰۳، ساعت ۱۵:۴۵
 */
export const toPersianDate = (
  date: string | Date,
  // قبول می‌کنه ISO string یا Date
): string => {
  return new Date(date).toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
};

/**
 * فقط تاریخ (بدون ساعت)
 * مثال: چهارشنبه ۱۴ آذر ۱۴۰۳
 */
export const toPersianDateOnly = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * فقط ساعت
 * مثال: ۱۵:۴۵
 */
export const toPersianTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
};