import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const useCreateSizeGuid = () => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      image: string;
    }) => {
      return fetcher({
        route: "/helpers",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "راهنمای سایز با موفقیت ایجاد شد",
        loadingText: "در حال ایجاد راهنمای سایز",
      });
    },
  });
};

export const useUpdateSizeGuid = (id: number) => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      image: string;
    }) => {
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
