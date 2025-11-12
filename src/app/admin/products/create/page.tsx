"use client";

import { useEffect } from "react";
import AttributesProducts from "@/components/features/products/create/AttributesProducts";
import ProductInitialForm from "@/components/features/products/create/ProductInitialForm";
import { useRouter, useSearchParams } from "next/navigation";

const CreateNewProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    !searchParams.get("type") && router.push("/admin/products");
  }, []);

  return searchParams.get("type") === "infos" ? (
    <ProductInitialForm />
  ) : (
    <AttributesProducts />
  );
};

export default CreateNewProduct;
