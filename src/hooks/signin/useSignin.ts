import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

export const useRequestOtpMutation = () => {
  return useMutation({
    mutationFn: (phone: string) =>
      fetcher({
        route: "/auth/request-otp",
        method: "POST",
        body: { identifier: phone },
        successText: "کد ارسال شده به تلفن همراه خود را وارد نمایید",
      }),
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      fetcher({
        route: "/auth/verify-otp",
        method: "POST",
        body: { identifier: phone, code },
        successText: "به ادمین پنل خوش آمدید",
      }),
  });
};