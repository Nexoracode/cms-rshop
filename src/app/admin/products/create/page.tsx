"use client";

import { useEffect } from "react";
import BackToPage from "@/components/common/Breadcrumbs";
import AttributesProducts from "@/components/features/products/create/AttributesProducts";
import ProductInitialForm from "@/components/features/products/create/ProductInitialForm";
import { useRouter, useSearchParams } from "next/navigation";

const CreateNewProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    !searchParams.get("type") && router.push("/admin/products");
  }, []);

  return (
    <div>
      <BackToPage title="برگشت" link="/admin/products" />
      <section className="flex flex-col gap-6 py-6">
        {searchParams.get("type") === "infos" ? (
          <ProductInitialForm />
        ) : (
          <AttributesProducts />
        )}
      </section>
    </div>
  );
};

export default CreateNewProduct;
