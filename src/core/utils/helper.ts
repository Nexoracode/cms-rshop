export const stripHtml = (html?: string) =>
  (html ?? "")
    .replace(/<[^>]*>/g, "") // حذف تگ‌ها
    .replace(/&nbsp;/g, " ") // حذف nbsp
    .trim();

export const price = (
  value: number | string | null | undefined,
  showToman: boolean = true
): string => {
  if (!value) return showToman ? "۰ تومان" : "۰";

  const num = Number(value);
  const formatted = num.toLocaleString("fa-IR");

  return showToman ? `${formatted} تومان` : formatted;
};
