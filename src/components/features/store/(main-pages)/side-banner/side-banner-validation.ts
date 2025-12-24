export function validateSideBanner(
  data: any,
  showLinkFields: boolean,
  showBadgeFields: boolean
) {
  const errors: Record<string, string> = {};

  // عنوان (اجباری)
  if (!data.title || data.title.trim() === "") {
    errors.title = "لطفاً عنوان بنر را وارد کنید.";
  }

  // زیرعنوان (اجباری)
  if (!data.subtitle || data.subtitle.trim() === "") {
    errors.subtitle = "لطفاً متن بنر را وارد کنید.";
  }

  // تصویر یا رنگ پس‌زمینه (حداقل یکی)
  if (
    (!data.image_url || data.image_url.trim() === "") &&
    (!data.background_color || data.background_color.trim() === "")
  ) {
    errors.image_url = "لطفاً تصویر یا رنگ پس‌زمینه را مشخص کنید.";
  }

  // لینک (در صورت فعال بودن)
  if (showLinkFields) {
    if (!data.link || data.link.trim() === "") {
      errors.link = "لطفاً لینک بنر را وارد کنید.";
    }
  }

  // برچسب تخفیف (Badge)
  if (showBadgeFields) {
    if (!data.badge_text || data.badge_text.trim() === "") {
      errors.badge_text = "لطفاً متن برچسب را وارد کنید.";
    }

    if (!data.badge_color || data.badge_color.trim() === "") {
      errors.badge_color = "لطفاً رنگ برچسب را انتخاب کنید.";
    }
  }

  return errors;
}
