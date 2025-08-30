import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* 📁 Attribute Groups Start */

export const useGetAllAttributeGroup = () => {
  return useQuery({
    queryKey: ["all-attribute-group"],
    queryFn: () =>
      fetcher({
        route: "/attribute-group",
        isActiveToast: false,
      }),
  });
};

export const useAddNewAttributeGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/attribute-group",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "گروه ویژگی با موفقیت اضافه شد",
        loadingText: "درحال افزودن گروه ویژگی...",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

export const useUpdateAttributeGroup = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return fetcher({
        route: `/attribute-group/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "دسته بندی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی دسته بندی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

export const useDeleteAttributeGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return fetcher({
        route: `/attribute-group/${id}`,
        method: "DELETE",
        isActiveToast: true,
        successText: "دسته بندی با موفقیت حذف شد",
        loadingText: "درحال حذف دسته بندی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

/* 📁 Attribute Groups End */
