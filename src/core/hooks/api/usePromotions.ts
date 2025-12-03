// services/promotions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildQueryString } from "@/core/utils/buildQueryString";

export type PromotionType =
  | "coupon"
  | "flash_deal"
  | "free_shipping"
  | "first_order"
  | "next_order_reward";

// Factory function
export const createPromotionHooks = (
  type: PromotionType,
  queryKeyPrefix: string
) => {
  const useGetList = ({
    page = 1,
    filter,
    search,
    sortBy,
  }: {
    page?: number;
    filter?: Record<string, string[]>;
    search?: string;
    sortBy?: string[];
  } = {}) => {
    return useQuery({
      queryKey: [queryKeyPrefix + "-list", { page, filter, search, sortBy }],
      queryFn: () => {
        const params: Record<string, any> = { page, type }; // type حتماً باشه

        // دستی filter رو گسترش بده (دقیقاً مثل محصولات)
        if (filter) {
          for (const key in filter) {
            const values = filter[key];
            if (values?.length) {
              params[`filter.${key}`] = values;
            }
          }
        }

        if (search) params.search = search;
        if (sortBy?.length) params.sortBy = sortBy;

        const queryString = buildQueryString(params);

        return fetcher({
          route: `/admin/promotions?${queryString}`,
          isActiveToast: false,
        });
      },
    });
  };

  const useGetOne = (id?: number) => {
    return useQuery({
      queryKey: [queryKeyPrefix + "-one", id],
      queryFn: () =>
        fetcher({ route: `/admin/promotions/${id}`, isActiveToast: false }),
      enabled: !!id,
    });
  };

  const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: any) =>
        fetcher({
          route: "/admin/promotions",
          method: "POST",
          body: { ...data, type },
          isActiveToast: true,
          loadingText: `در حال ایجاد ${queryKeyPrefix}...`,
          successText: `${queryKeyPrefix} با موفقیت ایجاد شد`,
        }),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  const useUpdate = (id: number) => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: any) =>
        fetcher({
          route: `/admin/promotions/${id}`,
          method: "PUT",
          body: data,
          isActiveToast: true,
          loadingText: `در حال بروزرسانی ${queryKeyPrefix}...`,
          successText: `${queryKeyPrefix} با موفقیت بروزرسانی شد`,
        }),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-one", id] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: number) =>
        fetcher({
          route: `/admin/promotions/${id}`,
          method: "DELETE",
          isActiveToast: true,
          loadingText: `در حال حذف ${queryKeyPrefix}...`,
          successText: `${queryKeyPrefix} با موفقیت حذف شد`,
        }),
      onSuccess: (_data, id) => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-one", id] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  const useToggle = (id: number) => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (payload: { isActive: boolean }) =>
        fetcher({
          route: `/admin/promotions/${id}/toggle`,
          method: "PATCH",
          body: payload,
          isActiveToast: true,
          loadingText: payload.isActive
            ? `در حال فعال‌سازی ${queryKeyPrefix}...`
            : `در حال غیرفعال‌سازی ${queryKeyPrefix}...`,
          successText: payload.isActive
            ? `${queryKeyPrefix} فعال شد`
            : `${queryKeyPrefix} غیرفعال شد`,
        }),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-one", id] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  const useGetActive = () => {
    return useQuery({
      queryKey: ["active-" + queryKeyPrefix],
      queryFn: () =>
        fetcher({
          route: `/admin/promotions/active?type=${type}`,
          isActiveToast: false,
        }),
    });
  };

  return {
    useGetList,
    useGetOne,
    useCreate,
    useUpdate,
    useDelete,
    useToggle,
    useGetActive,
  };
};

/* =========================
   نمونه استفاده:
   ========================= */
export const FlashDealHooks = createPromotionHooks("flash_deal", "flash-deal");
export const FreeShippingHooks = createPromotionHooks(
  "free_shipping",
  "free-shipping"
);
export const CouponHooks = createPromotionHooks("coupon", "coupon");
export const FirstOrderHooks = createPromotionHooks(
  "first_order",
  "first-order"
);
export const NextOrderRewardHooks = createPromotionHooks(
  "next_order_reward",
  "next-order-reward"
);
