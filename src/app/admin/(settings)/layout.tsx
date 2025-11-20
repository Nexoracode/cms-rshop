"use client";

import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ShopInfosCard />
      <div className="min-h-[69vh]">
        <Breadcrumbs />
        <div className="mx-auto mb-32 lg:mb-6 flex flex-col gap-2 mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
