import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { buildQueryString } from "@/utils/buildQueryString";

/* -------------------------------- Types -------------------------------- */

export type Order = {
  id: number;
  user_id: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  note?: string;
  couponCode?: string;
};

export type OrderSortBy = Array<"id:ASC" | "id:DESC" | "createdAt:ASC" | "createdAt:DESC">;

type UseGetOrdersParams = {
  page?: number;
  limit?: number;
  sortBy?: OrderSortBy;
};

/* ------------------------------ Get All Orders ------------------------------ */

export const useGetOrders = ({ page = 1, limit = 20, sortBy }: UseGetOrdersParams = {}) => {
  return useQuery({
    queryKey: ["all-orders", page, limit, sortBy],
    queryFn: () => {
      const params: Record<string, any> = { page, limit };
      if (sortBy) params.sortBy = sortBy;

      const queryString = buildQueryString(params);
      return fetcher({
        route: `/orders/all?${queryString}`,
        isActiveToast: false,
      });
    },
  });
};

/* ------------------------------ Get One Order ------------------------------ */

export const useGetOneOrder = (id?: number) => {
  return useQuery({
    queryKey: ["one-order", id],
    queryFn: () =>
      fetcher({
        route: `/orders/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

/* ------------------------------ Create Order (from cart) ------------------------------ */

export const useCreateOrderFromCart = () => {
  return useMutation({
    mutationFn: (data: { note?: string; couponCode?: string }) => {
      return fetcher({
        route: "/orders/from-card",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ثبت سفارش...",
        successText: "سفارش با موفقیت ثبت شد",
      });
    },
  });
};

/* ------------------------------ Update Order Status ------------------------------ */

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return fetcher({
        route: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
        isActiveToast: true,
        loadingText: "در حال تغییر وضعیت سفارش...",
        successText: "وضعیت سفارش با موفقیت بروزرسانی شد",
      });
    },
    onSuccess: (_, variables) => {
      // invalidate specific order and list
      queryClient.invalidateQueries({ queryKey: ["one-order", variables.id] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-orders",
      });
    },
  });
};

/* ------------------------------ Delete One Order ------------------------------ */

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return fetcher({
        route: `/orders/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف سفارش...",
        successText: "سفارش با موفقیت حذف شد",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["one-order", id] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-orders",
      });
    },
  });
};
