import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () =>
      fetcher({
        route: "/users/cms",
        successText: "لیست کاربران با موفقیت دریافت شد",
        loadingText: "در حال دریافت لیست کاربران",
      }),
  });
};

export const useGetOneUser = (id: string) => {
  return useQuery({
    queryKey: ["one-user", id],
    queryFn: () =>
      fetcher({
        route: `/users/cms/${id}`,
        successText: "کاربر با موفقیت دریافت شد",
        loadingText: "در حال دریافت اطلاعات کاربر",
      }),
      enabled: !!id, // Only run the query if id is provided
  });
};

export const useAddNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/users",
        method: "POST",
        body: data,
        successText: "کاربر با موفقیت اضافه شد",
        loadingText: "درحال افزودن کاربر...",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
};
