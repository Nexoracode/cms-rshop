"use client";

import { AttributeProvider } from "@/components/Admin/_products/context/AttributeContext";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AttributeProvider>{children}</AttributeProvider>
    </>
  );
};

export default ProductLayout;
