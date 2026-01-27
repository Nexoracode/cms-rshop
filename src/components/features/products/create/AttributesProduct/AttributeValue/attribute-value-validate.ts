export function attributeValueValidation(attr: any) {
  const errs: Record<string, string> = {};

  if (attr.value?.trim().length === 0) {
    errs.value = "عنوان مقدار را وارد کنید";
  }

  if (!attr.attribute_id) {
    errs.attribute_id = "انتخاب ویژگی الزامی است";
  }

  return errs;
}
