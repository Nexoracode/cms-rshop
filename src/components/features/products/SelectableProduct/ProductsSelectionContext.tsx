"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../create/types/product";

type ProductsSelectionContextType = {
  selectedProducts: Product[];
  addProducts: (products: Product) => void;
  removeProducts: (id: number) => void;
  setProducts: (categories: Product[]) => void;
};

const ProductsSelectionContext = createContext<ProductsSelectionContextType | null>(null);

export const useProductsSelection = () => {
  const ctx = useContext(ProductsSelectionContext);
  if (!ctx) throw new Error("useProductsSelection must be used within ProductsSelectionProvider");
  return ctx;
};

export const ProductsSelectionProvider: React.FC<{
  initialProducts?: Product[];
  children: React.ReactNode;
}> = ({ initialProducts = [], children }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setSelectedProducts(initialProducts);
  }, [initialProducts]);

  const addProducts = (products: Product) => {
    setSelectedProducts((prev) => [...prev.filter((c) => c.id !== products.id), products]);
  };

  const removeProducts = (id: number) => {
    setSelectedProducts((prev) => prev.filter((c) => c.id !== id));
  };

  const setProducts = (categories: Product[]) => setSelectedProducts(categories);

  return (
    <ProductsSelectionContext.Provider
      value={{ selectedProducts, addProducts, removeProducts, setProducts }}
    >
      {children}
    </ProductsSelectionContext.Provider>
  );
};
