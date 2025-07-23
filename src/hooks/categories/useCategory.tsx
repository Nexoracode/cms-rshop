"use client";

import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: () =>
      fetcher({
        route: "/category",
        isActiveToast: false
      }),
  });
};
