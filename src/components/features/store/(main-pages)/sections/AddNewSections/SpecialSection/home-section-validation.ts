export function validateHomeSection(data: any) {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "لطفاً عنوان بخش را وارد کنید.";
  }

  if (!data.product_ids || !data.product_ids.length) {
    errors.product_ids = "انتخاب محصول الزامی است.";
  }

  if (!data.slug || data.slug.trim() === "") {
    errors.slug = "لطفاً اسلاگ بخش را وارد کنید.";
  }

  if (!data.display_style || data.display_style.trim() === "") {
    errors.display_style = "لطفاً نوع نمایش را انتخاب کنید.";
  }

  if (isNaN(data.products_limit) || data.products_limit < 0) {
    errors.products_limit = "تعداد نمایش باید یک عدد معتبر باشد.";
  }

  if (!data.view_all_link || data.view_all_link.trim() === "") {
    errors.view_all_link = "لطفاً لینک مشاهده همه را وارد کنید.";
  }

  return errors;
}
