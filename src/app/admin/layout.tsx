"use client";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row w-full bg-stone-100 px-2 !rounded-3xl">
      <div className="fixed lg:relative w-3/12 z-50 flex justify-center shadow-none">
        <Sidebar />
      </div>
      <div className="w-full lg:w-9/12 lg:pr-6">
        <div className="min-h-[69vh] mt-8">
          <div className="max-w-[794px] mx-auto mb-32 lg:mb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
