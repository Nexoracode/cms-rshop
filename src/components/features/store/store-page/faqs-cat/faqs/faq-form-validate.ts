export function faqFormValidation(icon: any) {
  const errs: Record<string, string> = {};

  const { name } = icon;

  if (!name.length) {
    errs.name = "عنوان سوال الزامی است";
  }

  return errs;
}
