export const stripHtml = (html?: string) =>
    (html ?? "")
      .replace(/<[^>]*>/g, "") // حذف تگ‌ها
      .replace(/&nbsp;/g, " ") // حذف nbsp
      .trim();