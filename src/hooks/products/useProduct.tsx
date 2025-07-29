import { SizeGuideProp } from "@/components/Admin/_products/__create/SizeGuide/type";
import { Product } from "@/components/Admin/_products/types/create-product";
import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProducts = (page: number = 1) => {
  return useQuery({
    queryKey: ["all-products", page],
    queryFn: () =>
      fetcher({
        route: `/product?page=${page}`,
        isActiveToast: false,
      }),
  });
};

export const useGetOneProduct = (id?: number) => {
  return useQuery({
    queryKey: ["one-product", id],
    queryFn: () =>
      fetcher({
        route: `/product/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
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

export const useProductUpdate = (id: number | undefined) => {
  return useMutation({
    mutationFn: (data: Product) => {
      return fetcher({
        route: `/product/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText:
          "محصول با موفقیت آپدیت شد. لطفا در صورت نیاز ادامه پروسه رو دنبال کنید تا ویژگی های محصول را هم ویرایش کنید",
        loadingText: "در حال آپدیت محصول",
      });
    },
  });
};

export const useDeleteProduct = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher({
        route: `/product/${id}`,
        method: "DELETE",
        successText: "محصول با موفقیت حذف شد",
        loadingText: "در حال حذف محصول",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product", id] });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-products",
      });
    },
  });
};
