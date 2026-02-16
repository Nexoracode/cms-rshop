"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* ---------------------- Get All Store Infos ---------------------- */
export const useGetStoreInfos = () => {
  return useQuery({
    queryKey: ["store-infos"],
    queryFn: () =>
      fetcher({
        route: "/admin/store-info",
        isActiveToast: false,
      }),
  });
};

/* ---------------------- Create Store Info ---------------------- */
export const useCreateStoreInfo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد صفحه اطلاعاتی...",
        successText: "صفحه اطلاعاتی ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-infos"] });
    },
  });
};

/* ---------------------- Upsert Store Info ---------------------- */
export const useUpsertStoreInfo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info/upsert",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ذخیره اطلاعات...",
        successText: "اطلاعات ذخیره شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-infos"] });
    },
  });
};

/* ---------------------- Update Store Info By Type ---------------------- */
export const useUpdateStoreInfo = (type: string | null) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/admin/store-info/${type}`,
        method: "PUT",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی...",
        successText: "صفحه بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-infos"] });
    },
  });
};

/* ====================== FAQ Section ====================== */

/* ---------------------- Get All FAQs ---------------------- */
export const useGetStoreFaqs = () => {
  return useQuery({
    queryKey: ["store-faqs"],
    queryFn: () =>
      fetcher({
        route: "/admin/store-info/faqs",
        isActiveToast: false,
      }),
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
        method: "PUT",
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
