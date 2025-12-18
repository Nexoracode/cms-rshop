import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useUploadSliderImages = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      fetcher({
        route: "/api/admin/upload-slider-images/upload",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال آپلود تصاویر...",
        successText: "تصاویر با موفقیت آپلود شدند",
      }),
  });
};
