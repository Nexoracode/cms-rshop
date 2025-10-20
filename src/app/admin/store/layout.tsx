"use client";

import ShopInfosCard from "@/components/admin/ArShopCard/ShopInfosCard";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mb-6">
        <ShopInfosCard />
      </div>
      <div className="min-h-[69vh]">
        <div className="max-w-[794px] mx-auto mb-32 lg:mb-0">{children}</div>
      </div>
    </div>
  );
};

export default StoreLayout;
