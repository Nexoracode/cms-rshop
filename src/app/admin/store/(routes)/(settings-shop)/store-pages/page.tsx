"use client";

import { BsInfoCircle } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { TbUserQuestion, TbWorldSearch } from "react-icons/tb";
import { useRouter } from "next/navigation";
import BaseCard from "@/components/ui/BaseCard";

const AboutStore = () => {
  const router = useRouter();

  const items = [
    {
      title: "درباره ما",
      description: "مدیریت صفحه معرفی فروشگاه",
      icon: BsInfoCircle,
      color: "text-yellow-700 bg-yellow-700/10",
      route: "/admin/store/store-pages/about_us",
    },
    {
      title: "راهنمای خرید",
      description: "مدیریت راهنمای خرید مشتریان",
      icon: IoDocumentTextOutline,
      color: "text-blue-700 bg-blue-700/10",
      route: "/admin/store/store-pages/purchase_guide",
    },
    {
      title: "شرایط بازگشت کالا",
      description: "مدیریت قوانین مرجوعی",
      icon: HiOutlineReceiptRefund,
      color: "text-orange-700 bg-orange-700/10",
      route: "/admin/store/store-pages/return_policy",
    },
    {
      title: "سوالات متداول",
      description: "مدیریت FAQ فروشگاه",
      icon: TbUserQuestion,
      color: "text-green-700 bg-green-700/10",
      route: "/admin/store/faqs",
    },
  ];

  return (
    <BaseCard
      CardHeaderProps={{
        title: "صفحات فروشگاه",
        icon: <TbWorldSearch />,
      }}
      bodyClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            onClick={() => router.push(item.route)}
            className="cursor-pointer rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-all"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl ${item.color}`}
            >
              <Icon />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{item.title}</span>
              <span className="text-sm text-gray-500">{item.description}</span>
            </div>
          </div>
        );
      })}
    </BaseCard>
  );
};

export default AboutStore;
