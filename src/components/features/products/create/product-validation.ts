import { stripHtml } from "@/core/utils/helper";

export function validateProduct(product: any) {
  const errs: Record<string, string> = {};

  const hasMedia =
    ((product.media_ids?.length || product.medias?.length) ?? 0) > 0;

  const hasPinned = !!product.media_pinned_id;
  const hasName = !!product.name?.trim();
  const hasPrice = Number(product.price) > 0;
  const hasCategory = Number(product.category_id) > 0;
  const hasWeight = Number(product.weight) > 0;
  const hasBrand = Number(product.brand_id) > 0;
  const hasDesc = stripHtml(product.description || "").length > 0;

  if (!hasName) {
    errs.name = "نام محصول الزامی است.";
  }

  if (!hasPrice) {
    errs.price = "قیمت معتبر نیست.";
  }

  if (!hasCategory) {
    errs.category_id = "انتخاب دسته بندی الزامی است.";
  }

  if (!hasWeight) {
    errs.weight = "وزن معتبر نیست.";
  }

  if (!hasBrand) {
    errs.brand_id = "انتخاب برند الزامی است.";
  }

  if (!hasDesc) {
    errs.description = "توضیحات نمی‌تواند خالی باشد.";
  }

  if (!hasMedia) {
    errs.media_ids = "حداقل یک تصویر باید انتخاب شود.";
  }

  if (!hasPinned) {
    errs.media_pinned_id = "پین کردن یک تصویر الزامی است.";
  }

  return errs;
}
