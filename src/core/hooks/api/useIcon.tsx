import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetIcons = ({
  page = 1,
  search,
  limit = 20,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["all-icons", page, search, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        search,
      });

      return fetcher({
        route: `/helpers?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

export const useCreateSizeGuid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => {
      return fetcher({
        route: "/helpers",
        method: "POST",
        body: data,
        isActiveToast: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-icons"] });
    },
  });
};

export const useUpdateSizeGuid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) => {
      return fetcher({
        route: `/helpers/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: " آیکون با موفقیت آپدیت شد",
        loadingText: "در حال آپدیت آیکون",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-icons"] });
    },
  });
};

export const useDeleteSizeGuide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      fetcher({
        route: `/helpers/${id}`,
        method: "DELETE",
        successText: " آیکون با موفقیت حذف شد",
        loadingText: "در حال حذف آیکون",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-icons"] });
    },
  });
};
