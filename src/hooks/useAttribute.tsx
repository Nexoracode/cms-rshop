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

/* 📁 Attribute Groups End */

/* 🧬 Attributes Start */

export const useGetAllAttribute = (groupedId: number) => {
  return useQuery({
    queryKey: ["all-attribute"],
    queryFn: () =>
      fetcher({
        route: `/attribute?grouped=${groupedId}`,
        isActiveToast: false,
      }),
  });
};

export const useAddNewAttribute = () => {
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
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
    },
  });
};

/* 🧬 Attributes End */
