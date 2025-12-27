export function validateSideBanner(data: any, showBadgeFields: boolean) {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "لطفاً عنوان بنر را وارد کنید.";
  }

  if (!data.subtitle || data.subtitle.trim() === "") {
    errors.subtitle = "لطفاً متن بنر را وارد کنید.";
  }

  if (
    (!data.image_url || data.image_url.trim() === "") &&
    (!data.background_color || data.background_color.trim() === "")
  ) {
    errors.image_url = "لطفاً تصویر یا رنگ پس‌زمینه را مشخص کنید.";
  }

  if (!data.link || data.link.trim() === "") {
    errors.link = "لطفاً لینک بنر را وارد کنید.";
  }

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
