"use server";

import fetcher from "@/utils/fetcher";

type Props = {
  newPassword: string;
  token: string;
};

export async function ResetPasswordAction({ newPassword, token }: Props) {
  const res = await fetcher({
    route: "/auth/reset-password",
    method: "POST",
    body: { token, newPassword },
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
