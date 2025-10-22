"use client";

import BackToPage from "@/components/common/BackToPage";

const Pockets = () => {
  return (
    <div className="flex flex-col gap-6">
      <BackToPage title="پیک فروشگاه" link="/admin/store" />

      <div className="bg-white p-4 rounded-2xl"></div>
    </div>
  );
};

export default Pockets;
