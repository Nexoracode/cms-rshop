export function collectionWrappingValidation(data: any) {
  const errs: Record<string, string> = {};

  if (!data.title?.trim()) {
    errs.title = "عنوان الزامی است.";
  }

  if (!data.slug?.trim()) {
    errs.slug = "نامک الزامی است.";
  }

  if (!data.description?.trim()) {
    errs.description = "توضیحات الزامی است.";
  }

  if (!data.image && !data.file) {
    errs.image = "تصویر الزامی است.";
  }

  return errs;
}
