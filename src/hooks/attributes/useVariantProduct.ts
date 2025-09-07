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

/* 🎭 Variant Products End */
