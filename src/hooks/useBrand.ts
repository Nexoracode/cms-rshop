import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

export const useGetBrands = (page = 1) => {
  return useQuery({
    queryKey: ["brands", page],
    queryFn: () =>
      fetcher({
        route: `/brand?page=${page}`,
        isActiveToast: false,
      }),
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo: string }) =>
      fetcher({
        route: "/brand",
        method: "POST",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export type BrandInput = {
  id: number;
  name: string;
  slug: string;
  logo: string;
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BrandInput) =>
      fetcher({
        route: `/brand/${data.id}`,
        method: "PATCH",
        body: {
          name: data.name,
          slug: data.slug,
          logo: data.logo,
        },
        isActiveToast: false,
      }),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", variables.id] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/brand/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف برند",
        successText: "برند حذف شد",
      }),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", id] });
    },
  });
};
