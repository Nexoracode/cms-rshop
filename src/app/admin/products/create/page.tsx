"use client";

import { useState } from "react";
import BackToPage from "@/components/Helper/BackToPage";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";
import ProductInitialForm from "@/components/Admin/_products/__create/ProductInitialForm";

const CreateNewProduct = () => {
  const [activeForm, setActiveForm] = useState<"infos" | "attributes">("infos");

  return (
    <div>
      <BackToPage title="برگشت" link="/admin/products" />
      <section className="flex flex-col gap-6 py-6">
        {activeForm === "infos" ? (
          <ProductInitialForm onApiCalled={() => setActiveForm("attributes")} />
        ) : (
          <AttributesProducts />
        )}
      </section>
    </div>
  );
};

export default CreateNewProduct;
