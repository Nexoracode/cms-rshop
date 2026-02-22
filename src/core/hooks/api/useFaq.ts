"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";

/* ---------------------- Get All FAQs ---------------------- */
export const useGetStoreCatFaqs = () => {
  return useQuery({
    queryKey: ["store-faq-cat"],
    queryFn: () =>
      fetcher({
        route: `/admin/store-info/faq-categories`,
        isActiveToast: false,
      }),
  });
};

export const useGetStoreFaqs = ({ page = 1, limit = 15 }: ListQueryParams) => {
  return useQuery({
    queryKey: ["store-faqs", page, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
      });
      return fetcher({
        route: `/admin/store-info/faqs?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

/* ---------------------- Create FAQ ---------------------- */
export const useCreateStoreFaq = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info/faqs",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد سوال...",
        successText: "سوال ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faqs"] });
    },
  });
};

/* ---------------------- Update FAQ ---------------------- */
export const useUpdateStoreFaq = (id: number | null) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/admin/store-info/faqs/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ویرایش سوال...",
        successText: "سوال بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faqs"] });
    },
  });
};

/* ---------------------- Delete FAQ ---------------------- */
export const useDeleteFaqCat = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/store-info/faq-categories/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف دسته بندی سوال...",
        successText: "دسته بندی حذف شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faq-cat"] });
    },
  });
};

export const useDeleteStoreFaq = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/store-info/faqs/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف سوال...",
        successText: "سوال حذف شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faqs"] });
    },
  });
};

/* ---------------------- Bulk Delete FAQs ---------------------- */
export const useBulkDeleteStoreFaqs = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) =>
      fetcher({
        route: "/admin/store-info/faqs/bulk",
        method: "DELETE",
        body: { ids },
        isActiveToast: true,
        loadingText: "در حال حذف دسته‌جمعی...",
        successText: "سوالات حذف شدند",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faqs"] });
    },
  });
};
