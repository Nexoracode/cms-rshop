import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetSupportList = () => {
  return useQuery({
    queryKey: ["support-list"],
    queryFn: () =>
      fetcher({
        route: "/admin/support",
        isActiveToast: false,
      }),
  });
};


export const useGetSupportDetail = (id?: number) => {
  return useQuery({
    queryKey: ["support-detail", id],
    queryFn: () =>
      fetcher({
        route: `/admin/support/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};


export const useReplySupport = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      fetcher({
        route: `/admin/support/${id}/reply`,
        method: "POST",
        body: { content },
        isActiveToast: true,
        successText: "پیام با موفقیت ارسال شد",
        loadingText: "در حال ارسال پیام",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["support-list"] });
    },
  });
};