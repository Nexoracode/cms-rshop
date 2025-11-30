export function validateVariant(form: any) {
  const errs: Record<string,string> = {};

  const hasSku = !!(form.sku ?? "").toString().trim();
  const hasPrice = Number(form.price) > 0;

  if (!hasSku) errs.sku = "کد کالا (SKU) الزامی است.";
  if (!hasPrice) errs.price = "قیمت باید بزرگتر از صفر باشد.";

  return errs;
}