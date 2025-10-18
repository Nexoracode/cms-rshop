import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { buildQueryString } from "@/utils/buildQueryString";
import {
  CouponPayload,
  CouponSortBy,
} from "@/components/Admin/_store/__promotions/DiscountCode/coupon-types";

type GetCouponsParams = {
  page?: number;
  sortBy?: CouponSortBy;
  search?: string;
  filter?: Record<string, string[]>; // ← NEW
};

export const useGetCoupons = ({
  page = 1,
  sortBy,
  search,
  filter,
}: GetCouponsParams = {}) => {
  return useQuery({
    queryKey: ["all-coupons", page, sortBy, search, filter],
    queryFn: () => {
      const params: Record<string, any> = { page };
      if (sortBy) params.sortBy = sortBy;
      if (search) params.search = search;

      if (filter) {
        for (const key in filter) {
          const values = filter[key];
          if (values?.length) params[`filter.${key}`] = values;
        }
      }

      const qs = buildQueryString(params);
      return fetcher({ route: `/coupon?${qs}`, isActiveToast: false });
    },
  });
};

export const useGetOneCoupon = (id?: number) => {
  return useQuery({
    queryKey: ["one-coupon", id],
    queryFn: () => fetcher({ route: `/coupon/${id}`, isActiveToast: false }),
    enabled: !!id,
  });
};

export const useCreateCoupon = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CouponPayload) =>
      fetcher({
        route: "/coupon",
        method: "POST",
        body: {
          ...data,
          start_date: data.start_date ? data.start_date : undefined,
          end_date: data.end_date ? data.end_date : undefined,
        },
        isActiveToast: true,
        loadingText: "در حال ایجاد کد تخفیف...",
        successText: "کد تخفیف با موفقیت ایجاد شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["all-coupons"] }),
  });
};

export const useUpdateCoupon = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CouponPayload) =>
      fetcher({
        route: `/coupon/${id}`,
        method: "PATCH",
        body: {
          ...data,
          start_date: data.start_date ? data.start_date : undefined,
          end_date: data.end_date ? data.end_date : undefined,
        },
        isActiveToast: true,
        loadingText: "در حال بروزرسانی کد تخفیف...",
        successText: "کد تخفیف با موفقیت ویرایش شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-coupons"] });
      qc.invalidateQueries({ queryKey: ["one-coupon", id] });
    },
  });
};

export const useDeleteCoupon = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetcher({
        route: `/coupon/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف کد تخفیف...",
        successText: "کد تخفیف با موفقیت حذف شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-coupons"] });
      qc.invalidateQueries({ queryKey: ["one-coupon", id] });
    },
  });
};
