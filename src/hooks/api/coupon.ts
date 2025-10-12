import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { buildQueryString } from "@/utils/buildQueryString";

export type CouponType = "percent" | "fixed";

export interface Coupon {
  id?: number;
  code: string;
  type: CouponType;
  amount: number;
  mid_order_amount?: number;
  max_discount_amount?: number;
  start_date?: string; // ISO
  end_date?: string; // ISO
  usage_limit?: number;
  is_active?: boolean;
  for_first_order?: boolean;
  allowed_user_ids?: number[];
  allowed_product_ids?: number[];
  allowed_category_ids?: number[];
  created_at?: string;
  updated_at?: string;
}

type GetCouponsParams = { page?: number; limit?: number };

// GET /api/coupon  => با page & limit
export const useGetCoupons = ({
  page = 1,
  limit = 20,
}: GetCouponsParams = {}) => {
  return useQuery({
    queryKey: ["all-coupons", page, limit],
    queryFn: () => {
      const qs = buildQueryString({ page, limit });
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
    mutationFn: (data: Coupon) =>
      fetcher({
        route: "/coupon",
        method: "POST",
        body: {
          ...data,
          start_date: data.start_date
            ? new Date(data.start_date).toISOString()
            : undefined,
          end_date: data.end_date
            ? new Date(data.end_date).toISOString()
            : undefined,
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
    mutationFn: (data: Partial<Coupon>) =>
      fetcher({
        route: `/coupon/${id}`,
        method: "PATCH",
        body: {
          ...data,
          start_date: data.start_date
            ? new Date(data.start_date).toISOString()
            : undefined,
          end_date: data.end_date
            ? new Date(data.end_date).toISOString()
            : undefined,
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
