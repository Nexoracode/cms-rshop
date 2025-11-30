export const validateCategory = (data: any) => {
  const errors: any = {};
  console.log("=> ",data);

  if (!data.title.trim()) errors.title = "عنوان الزامی است";
  if (!data.slug.trim()) errors.slug = "اسلاگ الزامی است";
  if (!data.mediaId && !data.mediaFile) errors.mediaId = "تصویر الزامی است";
  if (data.parentId === -1) errors.parentId =  "انتخاب دسته بندی الزامی است";

  return errors;
};
