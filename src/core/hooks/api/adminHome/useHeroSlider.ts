import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetHeroSliders = () => {
  return useQuery({
    queryKey: ["hero-sliders"],
    queryFn: () => fetcher({ route: "/api/admin/hero-sliders" }),
  });
};

export const useGetOneHeroSlider = (id?: number) => {
  return useQuery({
    queryKey: ["hero-slider", id],
    queryFn: () => fetcher({ route: `/api/admin/hero-sliders/${id}` }),
    enabled: !!id,
  });
};

export const useCreateHeroSlider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/api/admin/hero-sliders",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد اسلایدر...",
        successText: "اسلایدر با موفقیت ایجاد شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hero-sliders"] }),
  });
};

export const useUpdateHeroSlider = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/api/admin/hero-sliders/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی اسلایدر...",
        successText: "اسلایدر با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["hero-sliders"] });
      qc.invalidateQueries({ queryKey: ["hero-slider", id] });
    },
  });
};

export const useDeleteHeroSlider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/api/admin/hero-sliders/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف اسلایدر...",
        successText: "اسلایدر با موفقیت حذف شد",
      }),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["hero-sliders"] });
      qc.invalidateQueries({ queryKey: ["hero-slider", id] });
    },
  });
};

export const useUpdateHeroSlidersSortOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; sort_order: number }[]) =>
      fetcher({
        route: "/api/admin/hero-sliders/sort-order",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی ترتیب نمایش...",
        successText: "ترتیب اسلایدرها با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hero-sliders"] }),
  });
};
