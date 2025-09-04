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

export const useAddNewAttributeValue = () => {
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

export const useUpdateAttributeValue = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      fetcher({
        route: `/attribute-value/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "مقدار ویژگی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی مقدار ویژگی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attribute-values"] });
    },
  });
};

export const useReorderAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, display_order }: { id: number; display_order: number }) => {
      return fetcher({
        route: `/attribute-value/${id}/order`,
        method: "PATCH",
        body: { display_order },
        isActiveToast: true,
        successText: "جایگاه مقدار ویژگی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی جایگاه مقدار ویژگی...",
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["attribute-values"] });
    },
  });
};

export const useDeleteAttributeValue = () => {
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
        queryKey: ["attribute-values"],
      });
    },
  });
};

/* 🔠 Attribute Values End */
