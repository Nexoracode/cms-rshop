import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* =========================
   👤 اطلاعات کاربر فعلی
========================= */
export const useGetAdminMe = () => {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: () =>
      fetcher({
        route: "/admin/users/me",
        isActiveToast: false,
      }),
  });
};

/* =========================
   🛡 لیست نقش‌ها
========================= */
export const useGetAdminRoles = () => {
  return useQuery({
    queryKey: ["admin-roles"],
    queryFn: () =>
      fetcher({
        route: "/admin/users/roles",
        isActiveToast: false,
      }),
  });
};

/* =========================
   👑 لیست کارمندان
========================= */
export const useGetStaffs = ({
  admin = false,
}: {
  admin: boolean;
}) => {
  return useQuery({
    queryKey: ["admin-users", admin],
    queryFn: () =>
      fetcher({
        route: "/admin/users/admins",
        isActiveToast: false,
      }),
    enabled: admin,
  });
};

export const useGetStaff = ({
  admin = false,
  id,
}: {
  admin: boolean;
  id: number;
}) => {
  return useQuery({
    queryKey: ["admin-user", admin, id],
    queryFn: () =>
      fetcher({
        route: `/admin/users/admins/${id}`,
        isActiveToast: false,
      }),
    enabled: admin,
  });
};

/* =========================
   ➕ ایجاد کارمند جدید
========================= */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/users/create",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "کاربر با موفقیت ایجاد شد",
        loadingText: "در حال ایجاد کاربر",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
};
