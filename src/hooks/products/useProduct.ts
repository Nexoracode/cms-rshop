import { Product } from "@/components/Admin/_products/types/create-product";
import { fetcher } from "@/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/*  */

type ProductFilter = {
  is_visible?: string[];
  stock?: string[];
  category_id?: string[];
  price?: string[];
  discount?: string[];
  createdAt?: string[];
  weight?: string[];
  requires_preparation?: string[];
};

type UseGetProductsParams = {
  page?: number;
  limit?: number;
  filter?: ProductFilter;
  search?: string;
  searchBy?: string[];
  sortBy?: ProductSortBy;
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

export function buildQueryString(params: Record<string, any>) {
  const query = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
    } else {
      query.append(key, value);
    }
  }
  return query.toString();
}

/*  */

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
        isActiveToast: true,
        loadingText: "درحال دریافت اطلاعات محصول",
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
        successText: "فایل ها با موفقیت بارگذاری شدند",
        loadingText: "در حال بارگذاری فایل ها",
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
