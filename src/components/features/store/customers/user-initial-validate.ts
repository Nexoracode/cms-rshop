export function userInitialValidate(user: any) {
  const errs: Record<string, string> = {};

  !user.first_name.length && (errs.first_name = "نام الزامی است");
  !user.last_name.length && (errs.last_name = "نام خوانوادگی الزامی است");
  !user.phone.length && (errs.phone = "شماره تماس الزامی است");

  return errs;
}
