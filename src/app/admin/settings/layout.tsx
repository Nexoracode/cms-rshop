"use client";
import ShopInfosCard from "@/components/Admin/ArShopCard/ShopInfosCard";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row w-full bg-stone-100 px-2 !rounded-3xl">
      <div className="fixed bottom-0 left-0 right-0 lg:relative w-3/12 z-50">
        <Sidebar />
      </div>
      <div className="w-full lg:w-9/12 lg:pr-6 mt-6">
        <div className="mb-6">
          <ShopInfosCard />
        </div>
        <div className="arshop-card min-h-[69vh]">
          <div className="max-w-[794px] mx-auto mb-32 lg:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;