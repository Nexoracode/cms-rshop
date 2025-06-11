"use server";

import fetcher from "@/utils/fetcher";

export async function forgetPasswordAction(email: string) {
  const res = await fetcher({
    route: "/auth/forget-password",
    method: "POST",
    body: { email },
  });

  if ("success" in res && !res.success) {
    return res;
  } else {
    if (res?.data)
      return {
        success: true,
        message: res.message,
      };

    return {
      success: false,
      message: res.message,
    };
  }
}
