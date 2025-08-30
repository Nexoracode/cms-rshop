/* 🧩 Category Attributes Start */

import { fetcher } from "@/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddNewCategoryAttribute = (
  attributeId: number | undefined,
  categoryId: number | undefined,
  groupedId: number | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/category-attribute",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "با موفقیت اضافه شد",
        loadingText: "درحال افزودن...",
      }),
    onSuccess: () => {
      if (attributeId) {
        queryClient.invalidateQueries({
          queryKey: ["attribute-values", attributeId],
        });
      }

      if (groupedId) {
        queryClient.invalidateQueries({
          queryKey: ["all-attribute", groupedId],
        });
      }
    },
  });
};

/* 🧩 Category Attributes End */
