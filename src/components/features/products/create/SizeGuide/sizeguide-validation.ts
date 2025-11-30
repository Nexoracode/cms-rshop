import { SizeGuideType } from "./type";

export function validateSizeGuide(f: SizeGuideType) {
  const errs: Record<string, string> = {};
  if (!f.title?.trim()) errs.title = "عنوان الزامی است.";
  if (!f.description?.trim()) errs.description = "توضیحات الزامی است.";
  const hasImage =
    typeof f.image === "string" ? !!f.image : f.image instanceof File;
  if (!hasImage) errs.image = "تصویر الزامی است.";
  return errs;
}
