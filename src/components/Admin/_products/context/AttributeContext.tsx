"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AttributeContextType = {
  attrInfos: Record<string, any>[];
  setAttrInfos: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
};

const AttributeContext = createContext<AttributeContextType | undefined>(
  undefined
);

export const AttributeProvider = ({ children }: { children: ReactNode }) => {
  const [attrInfos, setAttrInfos] = useState<Record<string, any>[]>([]);

  console.log("%%%%%%%%%%%%%%%%%%", attrInfos);

  return (
    <AttributeContext.Provider value={{ attrInfos, setAttrInfos }}>
      {children}
    </AttributeContext.Provider>
  );
};

export const useAttributeContext = () => {
  const ctx = useContext(AttributeContext);
  if (!ctx)
    throw new Error(
      "useAttributeContext must be used within AttributeProvider"
    );
  return ctx;
};
