"use client";

import { useEffect } from "react";
import AttributesProducts from "@/components/features/products/create/AttributesProducts";
import ProductInitialForm from "@/components/features/products/create/ProductInitialForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOneProduct } from "@/core/hooks/api/products/useProduct";

const CreateNewProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getEditId = searchParams.get("edit_id");
  const editId = getEditId ? +getEditId : null;
  const { data: product } = editId ? useGetOneProduct(+editId) : { data: null };

  useEffect(() => {
    !searchParams.get("type") && router.push("/admin/products");
  }, []);

  return searchParams.get("type") === "infos" ? (
    <ProductInitialForm data={product?.data} id={editId} />
  ) : (
    <AttributesProducts />
  );
};

export default CreateNewProduct;
