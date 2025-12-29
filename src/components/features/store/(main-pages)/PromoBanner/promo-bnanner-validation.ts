export function promoBannerValidation(data: any, showLinkFields: boolean) {
  const errors: Record<string, string> = {};

  // عنوان همیشه الزامی (برای مدیریت بهتر)
  if (!data.title || !data.title.trim()) {
    errors.title = "عنوان الزامی است";
  }

  // اعتبارسنجی تصویر یا رنگ بر اساس حالت
  if (data.useBackground) {
    // حالت پس‌زمینه رنگی
    if (!data.backgroundColor || !data.backgroundColor.trim()) {
      errors.backgroundColor = "رنگ پس‌زمینه الزامی است";
    }

    // توضیحات در حالت متنی بهتره الزامی باشه (اختیاری: می‌تونی حذف کنی)
    if (!data.description || !data.description.trim()) {
      errors.description = "توضیحات بنر الزامی است";
    }
  } else {
    // حالت تصویری
    if (!data.imageUrl && !data.mediaFile) {
      errors.imageUrl = "تصویر بنر الزامی است";
    }
  }

  // دکمه لینک اگر فعال باشه
  if (showLinkFields) {
    if (!data.linkText || !data.linkText.trim()) {
      errors.linkText = "متن دکمه الزامی است";
    }
    if (!data.link || !data.link.trim()) {
      errors.link = "لینک دکمه الزامی است";
    }
  }

  // بازه زمانی همیشه الزامی
  if (!data.startDate || !data.endDate) {
    errors.startDate = "بازه زمانی اعتبار الزامی است";
  }

  // اولویت و مدت نمایش
  if (isNaN(data.priority) || data.priority < 1) {
    errors.priority = "اولویت باید عدد مثبت باشد";
  }

  if (isNaN(data.displayDuration) || data.displayDuration < 5) {
    errors.displayDuration = "مدت نمایش باید حداقل ۵ ثانیه باشد";
  }

  return errors;
}
