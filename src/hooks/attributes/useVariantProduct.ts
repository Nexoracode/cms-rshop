import { fetcher } from "@/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* 🎭 Variant Products Start */

export const useAddNewVariantProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/variant-product",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "با موفقیت اضافه شد",
        loadingText: "درحال افزودن...",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useUpdateVariantProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) =>
      fetcher({
        route: `/variant-product/${+id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "با موفقیت آپدیت شد",
        loadingText: "درحال آپدیت...",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | string) =>
      fetcher({
        route: `/variant-product/${+id}`,
        method: "DELETE",
        successText: "با موفقیت حذف شد",
        loadingText: "در حال حذف...",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

/* 🎭 Variant Products End */
