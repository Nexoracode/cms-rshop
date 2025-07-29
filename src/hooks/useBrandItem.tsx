import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const useCreateBrandItem = () => {
  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo: string }) => {
      return fetcher({
        route: "/brand",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "برند با موفقیت ایجاد شد",
        loadingText: "در حال ایجاد برند جدید",
      });
    },
  });
};

export const useUpdateBrand = (id: number) => {
  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo: string }) => {
      return fetcher({
        route: `/brand/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "برند با موفقیت آپدیت شد",
        loadingText: "در حال آپدیت برند",
      });
    },
  });
};
