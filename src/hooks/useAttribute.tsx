import { fetcher } from "@/utils/fetcher";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

//? ///////////////////////////////////////////////////////////////////////////

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
      fetcher({
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

//? ///////////////////////////////////////////////////////////////////////////

/* 🔠 Attribute Values Start */

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
        queryKey: ["attribute-values", attributeId],
      });
    },
  });
};

export const useUpdateAttributeValue = (
  id: number,
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
        successText: "ویژگی با موفقیت حذف شد",
        loadingText: "درحال حذف ویژگی...",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["attribute-values", attributeId],
      });
      queryClient.invalidateQueries({ queryKey: ["attribute-value", id] });
    },
  });
};

/* 🔠 Attribute Values End */

//? ///////////////////////////////////////////////////////////////////////////

/* 🧩 Category Attributes Start */

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
