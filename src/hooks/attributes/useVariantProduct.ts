import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

/* 🎭 Variant Products Start */

export const useAddNewVariantProduct = () => {
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
  });
};

export const useUpdateVariantProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return fetcher({
        route: `/variant-product/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "با موفقیت آپدیت شد",
        loadingText: "درحال آپدیت...",
      });
    },
  });
};

/* 🎭 Variant Products End */
