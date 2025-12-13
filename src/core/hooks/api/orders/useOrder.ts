import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { ListQueryParams } from "@/core/types";

export const useGetOrders = ({
  page = 1,
  sortBy,
  filter,
  search,
  limit = 10,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["all-orders", page, sortBy, filter, search, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        sortBy,
        search,
        filter,
      });

      return fetcher({
        route: `/orders/all?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

export type ManualOrderPayload = {
  userId: number;
  addressId: number;
  items: Array<{
    product_id: number;
    variant_ids: Array<{
      id: number;
      quantity: number;
    }>[];
  }>;
};

export const useCreateManualOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: ManualOrderPayload) =>
      fetcher({
        route: "/orders/manual",
        method: "POST",
        body: orderData,
        isActiveToast: true,
        loadingText: "در حال ثبت سفارش دستی...",
        successText: "سفارش دستی با موفقیت ثبت شد",
      }),
    onSuccess: () => {
      // invalidate all order lists
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-orders",
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
