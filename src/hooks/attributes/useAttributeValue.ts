/* 🔠 Attribute Values Start */

import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAttributeValues = (attributeId: number | undefined) => {
  return useQuery({
    queryKey: ["attribute-values", attributeId],
    queryFn: () =>
      fetcher({
        route: `/attribute-value/attribute/${attributeId}`,
        isActiveToast: false,
      }),
    enabled: !!attributeId,
  });
};

export const useAddNewAttributeValue = (attributeId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/attribute-value",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "مقدار ویژگی با موفقیت اضافه شد",
        loadingText: "درحال افزودن مقدار ویژگی...",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attribute-values"],
      });
    },
  });
};

export const useUpdateAttributeValue = (
  id: number | undefined,
  attributeId: number | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      fetcher({
        route: `/attribute-value/${id}/order`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "مقدار ویژگی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی مقدار ویژگی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attribute-values", attributeId],
      });
      queryClient.invalidateQueries({ queryKey: ["attribute-value", id] });
    },
  });
};

export const useDeleteAttributeValue = (attributeId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      fetcher({
        route: `/attribute-value/${id}`,
        method: "DELETE",
        isActiveToast: true,
        successText: "مقدار ویژگی با موفقیت حذف شد",
        loadingText: "درحال حذف مقدار ویژگی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attribute-values", attributeId],
      });
    },
  });
};

/* 🔠 Attribute Values End */
