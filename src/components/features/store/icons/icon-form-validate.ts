export function IconFormvalidation(icon: any) {
  const errs: Record<string, string> = {};

  const {name} = icon

  if (!name.length) {
    errs.name = "نام آیکون الزامی است.";
  }

  return errs;
}
