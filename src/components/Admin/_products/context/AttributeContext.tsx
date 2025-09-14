"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AttributeContextType = {
  attrInfos: any[];
  setAttrInfos: React.Dispatch<React.SetStateAction<any[]>>;
};

const AttributeContext = createContext<AttributeContextType | undefined>(
  undefined
);

export const AttributeProvider = ({ children }: { children: ReactNode }) => {
  const [attrInfos, setAttrInfos] = useState<any[]>([]);

  useEffect(() => {
    console.log("CONTEXT", attrInfos);
  }, [attrInfos]);

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
