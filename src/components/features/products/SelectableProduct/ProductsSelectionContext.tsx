"use client";

import React, { createContext, useContext, useState } from "react";

type SelectedProduct = Record<string, any>;

type ProductsSelectionContextType = {
  selectedProducts: SelectedProduct[];
  setProducts: (products: SelectedProduct[]) => void;
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
  initialProducts?: SelectedProduct[];
  children: React.ReactNode;
}> = ({ initialProducts = [], children }) => {
  const [selectedProducts, setSelectedProducts] =
    useState<SelectedProduct[]>(initialProducts);

  const setProducts = (products: SelectedProduct[]) => {
    setSelectedProducts(products);
  };

  return (
    <ProductsSelectionContext.Provider
      value={{ selectedProducts, setProducts }}
    >
      {children}
    </ProductsSelectionContext.Provider>
  );
};
