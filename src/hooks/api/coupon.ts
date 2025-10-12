import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

/* ----------------------------- Type Definitions ----------------------------- */

export type CouponType = "percent" | "fixed";

export interface Coupon {
  id?: number;
  code: string;
  type: CouponType;
  amount: number;
  mid_order_amount?: number;
  max_discount_amount?: number;
  start_date?: string; // ISO string
  end_date?: string; // ISO string
  usage_limit?: number;
  is_active?: boolean;
  for_first_order?: boolean;
  allowed_user_ids?: number[];
  allowed_product_ids?: number[];
  allowed_category_ids?: number[];
  created_at?: string;
  updated_at?: string;
}

/* ------------------------------ React Queries ------------------------------ */

// 📄 دریافت همه کوپن‌ها
export const useGetCoupons = () => {
  return useQuery({
    queryKey: ["all-coupons"],
    queryFn: () =>
      fetcher({
        route: "/coupon",
        isActiveToast: false,
      }),
  });
};

// 🔍 دریافت جزئیات یک کوپن
export const useGetOneCoupon = (id?: number) => {
  return useQuery({
    queryKey: ["one-coupon", id],
    queryFn: () =>
      fetcher({
        route: `/coupon/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

// ➕ ایجاد کوپن جدید
export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Coupon) => {
      // بک‌اند به ISO 8601 حساسه → تبدیل تاریخ‌ها
      const formattedData = {
        ...data,
        start_date: data.start_date
          ? new Date(data.start_date).toISOString()
          : undefined,
        end_date: data.end_date
          ? new Date(data.end_date).toISOString()
          : undefined,
      };

      return fetcher({
        route: "/coupon",
        method: "POST",
        body: formattedData,
        isActiveToast: true,
        loadingText: "در حال ایجاد کد تخفیف...",
        successText: "کد تخفیف با موفقیت ایجاد شد",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
    },
  });
};

// 📝 ویرایش کوپن
export const useUpdateCoupon = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Coupon>) => {
      const formattedData = {
        ...data,
        start_date: data.start_date
          ? new Date(data.start_date).toISOString()
          : undefined,
        end_date: data.end_date
          ? new Date(data.end_date).toISOString()
          : undefined,
      };

      return fetcher({
        route: `/coupon/${id}`,
        method: "PATCH",
        body: formattedData,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی کد تخفیف...",
        successText: "کد تخفیف با موفقیت ویرایش شد",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
      queryClient.invalidateQueries({ queryKey: ["one-coupon", id] });
    },
  });
};

// ❌ حذف کوپن
export const useDeleteCoupon = (id: number) => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
      queryClient.invalidateQueries({ queryKey: ["one-coupon", id] });
    },
  });
};
