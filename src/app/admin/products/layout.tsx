"use client";

import { AttributeProvider } from "@/components/features/products/create/context/AttributeContext";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <AttributeProvider>
       <div className="flex flex-col gap-6 pb-6">
          {children}
        </div>
      </AttributeProvider>
  );
};

export default ProductLayout;
