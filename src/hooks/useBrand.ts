import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

export const useGetBrands = (page = 1) => {
  return useQuery({
    queryKey: ["brands", page],
    queryFn: () =>
      fetcher({
        route: `/brand?page=${page}`,
        isActiveToast: false,
      }),
  });
};

export const useGetBrand = (id?: number) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () =>
      fetcher({
        route: `/brand/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo: string }) =>
      fetcher({
        route: "/brand",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد برند",
        successText: "برند با موفقیت ایجاد شد",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-brands"] });
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useUpdateBrand = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo: string }) =>
      fetcher({
        route: `/brand/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال به‌روزرسانی برند",
        successText: "برند با موفقیت به‌روزرسانی شد",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-brands"] });
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", id] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/brand/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف برند",
        successText: "برند حذف شد",
      }),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["all-brands"] });
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", id] });
    },
  });
};
