export function feauturedSectionValidation(data: any) {
  const errors: Record<string, string> = {};

  if (isNaN(data.products_limit) || data.products_limit <= 0) {
    errors.products_limit = "تعداد نمایش باید یک عدد معتبر باشد.";
  }

  if (!data.view_all_link || data.view_all_link.trim() === "") {
    errors.view_all_link = "لطفاً لینک مشاهده همه را وارد کنید.";
  }

  return errors;
}
