"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../category.types";

type CategoriesSelectionContextType = {
  selectedCategories: Category[];
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  setCategories: (categories: Category[]) => void;
};

const CategoriesSelectionContext = createContext<CategoriesSelectionContextType | null>(null);

export const useCategoriesSelection = () => {
  const ctx = useContext(CategoriesSelectionContext);
  if (!ctx) throw new Error("useCategoriesSelection must be used within CategoriesSelectionProvider");
  return ctx;
};

export const CategoriesSelectionProvider: React.FC<{
  initialCategories?: Category[];
  children: React.ReactNode;
}> = ({ initialCategories = [], children }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    setSelectedCategories(initialCategories);
  }, [initialCategories]);

  const addCategory = (category: Category) => {
    setSelectedCategories((prev) => [...prev.filter((c) => c.id !== category.id), category]);
  };

  const removeCategory = (id: number) => {
    setSelectedCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const setCategories = (categories: Category[]) => setSelectedCategories(categories);

  return (
    <CategoriesSelectionContext.Provider
      value={{ selectedCategories, addCategory, removeCategory, setCategories }}
    >
      {children}
    </CategoriesSelectionContext.Provider>
  );
};
