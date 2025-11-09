"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";
import { useGetAllUsers } from "@/core/hooks/api/users/useUsers";
import { useGetProducts } from "@/core/hooks/api/products/useProduct";

const ReviewsFilterModal: React.FC = () => {
  const { data: usersData } = useGetAllUsers({ page: 1 });
  const { data: productsData } = useGetProducts({ page: 1 });
  console.log(productsData);

  const users = useMemo(
    () =>
      usersData?.data?.items?.map((b: any) => ({
        key: String(b.id),
        title: `${b.first_name} ${b.last_name}` || "بدون نام",
      })) || [],
    [usersData?.data?.items]
  );

  const products = useMemo(
    () =>
      productsData?.data?.items?.map((b: any) => ({
        key: String(b.id),
        title: b.name,
      })) || [],
    [productsData?.data?.items]
  );

  const fields: FilterField[] = [
    {
      key: "is_approved",
      label: "تایید کامنت",
      type: "boolean01",
      default: "",
    },
    { key: "user_id", label: "کاربران", type: "select", options: users, searchable: true },
    { key: "product_id", label: "محصولات", type: "select", options: products, searchable: true },
  ];

  return <FilterModal title="فیلتر دیدگاه ها" fields={fields} />;
};

export default ReviewsFilterModal;
