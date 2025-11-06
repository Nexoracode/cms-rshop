"use client";

import React, { createContext, useContext, useState } from "react";

export type Product = Record<string, any>;

type ProductsSelectionContextType = {
  selectedProducts: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; // ✅ اصلاح شد
};

const ProductsSelectionContext =
  createContext<ProductsSelectionContextType | null>(null);

export const useProductsSelection = () => {
  const ctx = useContext(ProductsSelectionContext);
  if (!ctx)
    throw new Error(
      "useProductsSelection must be used within ProductsSelectionProvider"
    );
  return ctx;
};

export const ProductsSelectionProvider: React.FC<{
  initialProducts?: Product[];
  children: React.ReactNode;
}> = ({ initialProducts = [], children }) => {
  const [selectedProducts, setSelectedProducts] =
    useState<Product[]>(initialProducts);

  return (
    <ProductsSelectionContext.Provider
      value={{ selectedProducts, setProducts: setSelectedProducts }}
    >
      {children}
    </ProductsSelectionContext.Provider>
  );
};
