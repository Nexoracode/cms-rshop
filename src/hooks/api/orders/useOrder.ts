import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { buildQueryString } from "@/utils/buildQueryString";
import { OrderSortBy } from "@/components/Admin/_orders/order-types";


type UseGetOrdersParams = {
  page?: number;
  sortBy?: OrderSortBy;
  filter?: Record<string, string[]>;
  search?: string;
};

export const useGetOrders = ({
  page = 1,
  sortBy,
  filter,
  search,
}: UseGetOrdersParams = {}) => {
  return useQuery({
    queryKey: ["all-orders", page, sortBy, filter, search],
    queryFn: () => {
      const params: Record<string, any> = { page };
      if (sortBy) params.sortBy = sortBy;
      if (search) params.search = search;
      // ← پشتیبانی از filter.* شبیه بقیه صفحات
      if (filter) {
        for (const key in filter) {
          const values = filter[key];
          if (values?.length) params[`filter.${key}`] = values;
        }
      }

      const qs = buildQueryString(params);
      return fetcher({ route: `/orders/all?${qs}`, isActiveToast: false });
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
