import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

export const useGetAllUsers = (page: number) => {
  return useQuery({
    queryKey: ["all-users", page],
    queryFn: () =>
      fetcher({
        route: `/users?page=${page}`,
        successText: "لیست کاربران با موفقیت دریافت شد",
        loadingText: "در حال دریافت لیست کاربران",
      }),
  });
};

export const useGetOneUser = (id: number) => {
  return useQuery({
    queryKey: ["one-user", id],
    queryFn: () =>
      fetcher({
        route: `/users/${id}`,
        successText: "کاربر با موفقیت دریافت شد",
        loadingText: "در حال دریافت اطلاعات کاربر",
      }),
    enabled: !!id, // Only run the query if id is provided
  });
};

export const useDeleteUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher({
        route: `/users/${id}`,
        method: "DELETE",
        successText: "کاربر با موفقیت حذف شد",
        loadingText: "در حال حذف کاربر",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-user", id] });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-users",
      });
    },
  });
};

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) =>
      fetcher({
        route: `/users/${id}`,
        method: "PATCH",
        successText: "کاربر با موفقیت ویرایش شد",
        loadingText: "در حال ویرایش کاربر",
        isActiveToast: true,
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-user", id] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
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
        isActiveToast: true,
        successText: "کاربر با موفقیت اضافه شد",
        loadingText: "درحال افزودن کاربر...",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
};
