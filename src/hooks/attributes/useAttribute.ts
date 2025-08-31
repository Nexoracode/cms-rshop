import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* 🧬 Attributes Start */

export const useGetAllAttribute = (groupedId: number | undefined) => {
  return useQuery({
    queryKey: ["all-attribute", groupedId],
    queryFn: () =>
      fetcher({
        route: `/attribute/group/${groupedId}`,
        isActiveToast: false,
      }),
    enabled: !!groupedId,
  });
};

export const useGetOneAttribute = (id: number | undefined) => {
  return useQuery({
    queryKey: ["attribute", id],
    queryFn: () =>
      fetcher({
        route: `/attribute/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

export const useAddNewAttribute = (groupedId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/attribute",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "ویژگی با موفقیت اضافه شد",
        loadingText: "درحال افزودن ویژگی...",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute", groupedId] });
    },
  });
};

export const useUpdateAttribute = (
  id: number,
  groupedId: number | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return fetcher({
        route: `/attribute/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "ویژگی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی ویژگی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute", groupedId] });
      queryClient.invalidateQueries({ queryKey: ["attribute", id] });
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

export const useDeleteAttribute = (groupedId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      fetcher({
        route: `/attribute/${id}`,
        method: "DELETE",
        isActiveToast: true,
        successText: "ویژگی با موفقیت حذف شد",
        loadingText: "درحال حذف ویژگی...",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute", groupedId] });
      queryClient.removeQueries({ queryKey: ["attribute", id] });
    },
  });
};

/* 🧬 Attributes End */
