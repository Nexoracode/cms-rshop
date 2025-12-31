import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useUpdateHomePageLayout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      type,
    }: {
      data: any;
      type: "side_by_side" | "stacked";
    }) =>
      fetcher({
        route: `/admin/settings/homepage-layout/${type}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی چیدمان...",
        successText: "چیدمان با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
