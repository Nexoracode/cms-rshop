"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import { AttributeProvider } from "@/components/features/products/create/context/AttributeContext";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AttributeProvider>
      <div className="flex flex-col gap-4 pb-6">
        <Breadcrumbs />
        {children}
      </div>
    </AttributeProvider>
  );
};

export default ProductLayout;
