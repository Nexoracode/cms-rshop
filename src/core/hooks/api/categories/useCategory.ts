"use client";

import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategories = (page = 1) => {
  return useQuery({
    queryKey: ["categories", { page }],
    queryFn: () => {
      return fetcher({ route: `/category?page=${page}`, isActiveToast: false });
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: () =>
      fetcher({
        route: "/category",
        isActiveToast: false,
      }),
  });
};

export const useGetCategory = (id?: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () =>
      fetcher({
        route: `/category/${id}`,
        isActiveToast: true,
        loadingText: "درحال گرفتن مقادیر دسته بندی فعلی",
        successText: "دسته‌بندی آماده ویرایش است",
      }),
    enabled: !!id,
  });
};

/* -------- Mutations -------- */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/category",
        method: "POST",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) =>
      fetcher({
        route: `/category/${data.id}`,
        method: "PATCH",
        body: {
          title: data.title,
          slug: data.slug,
          mediaId: data.mediaId,
          discount: data.discount,
          parentId: data.parentId,
        },
        isActiveToast: false,
      }),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/category/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف دسته‌بندی",
        successText: "دسته‌بندی حذف شد",
      }),
    onSuccess: (_res, id) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};

export const useCategoryImageUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      fetcher({
        route: "/category/upload",
        method: "POST",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};
