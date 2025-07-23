"use client";

import { CategoryData } from "@/components/Admin/_products/__categories/category-types";
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
    mutationFn: (data: CategoryData) =>
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
