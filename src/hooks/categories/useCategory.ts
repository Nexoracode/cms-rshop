"use client";

import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: () =>
      fetcher({
        route: "/category",
        isActiveToast: false,
      }),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/category",
        method: "POST",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};

export const useCategoryImageUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/category/upload",
        method: "POST",
        body: data,
        isActiveToast: false
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};
