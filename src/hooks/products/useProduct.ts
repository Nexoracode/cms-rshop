import { Product } from "@/components/Admin/_products/types/create-product";
import { buildQueryString } from "@/utils/buildQueryString";
import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/*  */

type ProductFilter = {
  is_visible?: string[]; // $eq:1|0
  requires_preparation?: string[]; // $eq:1|0
  category_id?: string[]; // $eq:...
  brand_id?: string[]; // $eq:...
  price?: string[]; // $gte/$lte
  stock?: string[]; // $gte/$lte
  weight?: string[]; // $gte/$lte
  discount_amount?: string[]; // $gte/$lte
  discount_percent?: string[]; // $gte/$lte
  created_at?: string[]; // $gte/$lte/$btw
};

export type ProductSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "name:ASC"
  | "name:DESC"
  | "price:ASC"
  | "price:DESC"
  | "stock:ASC"
  | "stock:DESC"
>;

type UseGetProductsParams = {
  page?: number;
  limit?: number;
  filter?: ProductFilter;
  search?: string;
  searchBy?: string[];
  sortBy?: ProductSortBy;
};

export const useGetProducts = ({
  page = 1,
  filter,
  search,
  searchBy,
  sortBy,
}: Omit<UseGetProductsParams, "limit">) => {
  return useQuery({
    queryKey: ["all-products", page, filter, search, sortBy],
    queryFn: () => {
      const params: Record<string, any> = { page, limit: 10 };

      if (filter) {
        for (const key in filter) {
          const values = filter[key as keyof ProductFilter];
          if (values) {
            params[`filter.${key}`] = values;
          }
        }
      }

      if (search) params.search = search;
      if (searchBy) params.searchBy = searchBy;
      if (sortBy) params.sortBy = sortBy;

      const queryString = buildQueryString(params);
      return fetcher({
        route: `/product?${queryString}`,
        isActiveToast: false,
      });
    },
  });
};

export const useGetOneProduct = (id?: number) => {
  return useQuery({
    queryKey: ["one-product", id],
    queryFn: () =>
      fetcher({
        route: `/product/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

export const useProductUpload = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return fetcher({
        route: "/product/upload",
        method: "POST",
        body: data,
        isActiveToast: false,
      });
    },
  });
};

export const useProductCreate = () => {
  return useMutation({
    mutationFn: (data: Product) => {
      return fetcher({
        route: "/product",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText:
          "محصول با موفقیت ایجاد شد. لطفا ادامه پروسه رو دنبال کنید تا محصول نهایی شود",
        loadingText: "در حال ایجاد محصول",
      });
    },
  });
};

export const useProductUpdate = (id: number | undefined) => {
  return useMutation({
    mutationFn: (data: Product) => {
      return fetcher({
        route: `/product/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText:
          "محصول با موفقیت آپدیت شد. لطفا در صورت نیاز ادامه پروسه رو دنبال کنید تا ویژگی های محصول را هم ویرایش کنید",
        loadingText: "در حال آپدیت محصول",
      });
    },
  });
};

export const useDeleteProduct = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher({
        route: `/product/${id}`,
        method: "DELETE",
        successText: "محصول با موفقیت حذف شد",
        loadingText: "در حال حذف محصول",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product", id] });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-products",
      });
    },
  });
};

export const useDeleteGroupProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids }: { ids: number[] }) =>
      fetcher({
        route: "/product/bulk",
        method: "DELETE",
        body: { ids },
        successText: "محصول های انتخاب شده با موفقیت حذف شدند",
        loadingText: "در حال حذف محصولات انتخاب شده",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-products",
      });
    },
  });
};
