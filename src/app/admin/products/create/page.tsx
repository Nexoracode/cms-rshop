"use client";

import { useEffect } from "react";
import AttributesProducts from "@/components/features/products/create/AttributesProducts";
import ProductInitialForm from "@/components/features/products/create/ProductInitialForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOneProduct } from "@/core/hooks/api/products/useProduct";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";

const CreateNewProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (!type) {
      router.replace("/admin/products");
    }
  }, [type, router]);

  const { data, isLoading, editId } = useFetchOnEdit(useGetOneProduct);

  return type === "infos" ? (
    <ProductInitialForm data={data} id={editId} isLoading={isLoading} />
  ) : (
    <AttributesProducts />
  );
};

export default CreateNewProduct;
