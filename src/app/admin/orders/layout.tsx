"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import React from "react";

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <Breadcrumbs />
      {children}
    </div>
  );
};

export default OrderLayout;
