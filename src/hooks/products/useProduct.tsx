import { Product } from "@/components/Admin/_products/__create/product-type";
import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = (page: number = 1) => {
  return useQuery({
    queryKey: ["all-products", page],
    queryFn: () =>
      fetcher({
        route: `/products?page=${page}`,
        isActiveToast: false,
      }),
  });
};

export const useProductUpload = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return fetcher({
        route: "/product/upload",
        method: "POST",
        body: data,
        successText: "فایل ها با موفقیت بارگذاری شدند",
        loadingText: "در حال بارگذاری فایل ها",
      });
    },
  });
};

export const useProductCreate = () => {
  return useMutation({
    mutationFn: (data: Product) => {
      return fetcher({
        route: "/product",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText:
          "محصول با موفقیت ایجاد شد. لطفا ادامه پروسه رو دنبال کنید تا محصول نهایی شود",
        loadingText: "در حال ایجاد محصول",
      });
    },
  });
};
