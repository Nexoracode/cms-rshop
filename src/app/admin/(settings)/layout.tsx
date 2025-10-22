"use client";

import ShopInfosCard from "@/components/common/ArshopCard/ShopInfosCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ShopInfosCard />
      <div className="min-h-[69vh]">
        <Breadcrumbs />
        <div className="max-w-[794px] mx-auto mb-32 lg:mb-12 flex flex-col gap-6 mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
