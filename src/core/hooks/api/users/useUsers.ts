import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildQueryString } from "@/core/utils/buildQueryString";

export type UserFilter = {
  isActive?: string[];        // ["like:John", "$not:$like:Jane"]
  createdAt?: string[];       // ["$gte:2025-01-01", "$lte:2025-10-01"]
};

export type UserSortBy = Array<
  "id:ASC" | "id:DESC" |
  "firstName:ASC" | "firstName:DESC" |
  "email:ASC" | "email:DESC" |
  "phone:ASC" | "phone:DESC"
>;

type UseGetAllUsersParams = {
  page?: number;
  filter?: UserFilter;
  search?: string;
  sortBy?: UserSortBy;
};

export const useGetAllUsers = ({ page = 1, filter, search, sortBy }: UseGetAllUsersParams) => {
  return useQuery({
    queryKey: ["all-users", page, filter, search, sortBy],
    queryFn: () => {
      const params: Record<string, any> = { page, limit: 40 };

      if (filter) {
        for (const key in filter) {
          const values = filter[key as keyof UserFilter];
          if (values) params[`filter.${key}`] = values;
        }
      }

      if (search) params.search = search;
      if (sortBy) params.sortBy = sortBy;

      const queryString = buildQueryString(params);
      return fetcher({ route: `/users?${queryString}`, isActiveToast: false });
    },
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
