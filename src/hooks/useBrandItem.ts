import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBrands = () => {
  return useQuery({
    queryKey: ["all-brands"],
    queryFn: () =>
      fetcher({
        route: `/brand/all`,
        isActiveToast: false,
      }),
  });
};

export const useCreateBrandItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo: string }) => {
      return fetcher({
        route: "/brand",
        method: "POST",
        body: data,
        isActiveToast: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-brands"] });
    },
  });
};

export const useUpdateBrand = (id: number) => {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-brands"] });
    },
  });
};
