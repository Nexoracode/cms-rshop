import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () =>
      fetcher({
        route: "/users",
        successText: "لیست کاربران با موفقیت دریافت شد",
        loadingText: "در حال دریافت لیست کاربران",
      }),
  });
};
