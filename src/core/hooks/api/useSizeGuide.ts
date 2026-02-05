import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSizeGuide = ({
  page = 1,
  sortBy,
  filter,
  search,
  limit = 10,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["all-size-guide", page, sortBy, filter, search, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        sortBy,
        search,
        filter,
      });

      return fetcher({
        route: `/helpers?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

export const useCreateSizeGuid = () => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      image: string;
    }) => {
      return fetcher({
        route: "/helpers",
        method: "GET",
        body: data,
        isActiveToast: false,
      });
    },
  });
};

export const useUpdateSizeGuid = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) => {
      return fetcher({
        route: `/helpers/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "راهنمای سایز با موفقیت آپدیت شد",
        loadingText: "در حال آپدیت راهنمای سایز",
      });
    },
  });
};

export const useSizeGuideUpload = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return fetcher({
        route: "/helpers/upload",
        method: "POST",
        body: data,
        isActiveToast: false,
      });
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
        successText: "راهنمای سایز با موفقیت حذف شد",
        loadingText: "در حال حذف راهنما سایز",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-size-guide"] });
    },
  });
};
