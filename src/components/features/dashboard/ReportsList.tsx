"use client";

import { TbWorldSearch } from "react-icons/tb";
import { PiMoneyWavyBold } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import BaseCard from "@/components/ui/BaseCard";
import CardHeader from "@/components/common/Card/CardHeader";
import { LuChartNetwork } from "react-icons/lu";
import BoxLink from "@/components/shared/BoxLink";
import MiniChart from "@/components/ui/charts/MiniChart";

const ReportsList = () => {
  // ✅ بخش داده‌ها (اینجا بذار)
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const visitsData = months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 5000) + 1000,
  }));

  const salesData = months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 8000000) + 2000000,
  }));

  const ordersData = months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 500) + 50,
  }));

  const usersData = months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 300) + 10,
  }));

  // ✅ از داده‌ها در JSX استفاده کن
  return (
    <BaseCard bodyClassName="p-0">
      <CardHeader
        title="گزارشات وبسایت"
        icon={<LuChartNetwork className="text-[24px]" />}
        showIconInActionSlot
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow-sm p-3 hover:bg-gray-100 transition">
          <BoxLink
            title="بازدید"
            icon={<TbWorldSearch className="text-2xl" />}
            routeName={"home/#"}
            parentStyle="text-gray-700 flex flex-col items-center"
            titleStyle="text-gray-600"
          />
          <MiniChart data={visitsData} color="#3b82f6" />
        </div>

        <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow-sm p-3 hover:bg-gray-100 transition">
          <BoxLink
            title="فروش کل"
            icon={<PiMoneyWavyBold className="text-2xl" />}
            routeName={"home/#"}
            parentStyle="text-gray-700 flex flex-col items-center"
            titleStyle="text-gray-600"
          />
          <MiniChart data={salesData} color="#16a34a" />
        </div>

        <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow-sm p-3 hover:bg-gray-100 transition">
          <BoxLink
            title="سفارش‌ها"
            icon={<HiOutlineDocumentText className="text-2xl" />}
            routeName={"home/#"}
            parentStyle="text-gray-700 flex flex-col items-center"
            titleStyle="text-gray-600"
          />
          <MiniChart data={ordersData} color="#f59e0b" />
        </div>

        <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow-sm p-3 hover:bg-gray-100 transition">
          <BoxLink
            title="مشتری جدید"
            icon={<FiUsers className="text-2xl" />}
            routeName={"home/#"}
            parentStyle="text-gray-700 flex flex-col items-center"
            titleStyle="text-gray-600"
          />
          <MiniChart data={usersData} color="#ef4444" />
        </div>
      </div>
    </BaseCard>
  );
};

export default ReportsList;
