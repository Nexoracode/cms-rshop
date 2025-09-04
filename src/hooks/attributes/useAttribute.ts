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

export const useReorderAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      display_order,
    }: {
      id: number;
      display_order: number;
    }) => {
      return fetcher({
        route: `/attribute/${id}/order`,
        method: "PATCH",
        body: { display_order },
        isActiveToast: true,
        successText: "جایگاه ویژگی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی جایگاه ویژگی...",
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
      queryClient.invalidateQueries({ queryKey: ["attribute", variables.id] });
    },
  });
};

export const useUpdateAttribute = (id: number) => {
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
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
      queryClient.invalidateQueries({ queryKey: ["attribute", id] });
    },
  });
};

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return fetcher({
        route: `/attribute/${id}`,
        method: "DELETE",
        isActiveToast: true,
        successText: "ویژگی با موفقیت حذف شد",
        loadingText: "درحال حذف ویژگی...",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
      queryClient.removeQueries({ queryKey: ["attribute", id] });
    },
  });
};

/* 🧬 Attributes End */
