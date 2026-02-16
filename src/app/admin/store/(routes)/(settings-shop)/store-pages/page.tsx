"use client";

import { BsInfoCircle } from "react-icons/bs";
import {
  TbCreditCardRefund,
  TbWorldSearch,
} from "react-icons/tb";
import BaseCard from "@/components/ui/BaseCard";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { LuMessageCircleQuestion } from "react-icons/lu";
import Link from "next/link";

const AboutStore = () => {

  const pages = [
    {
      type: "about_us",
      title: "درباره ما",
      description: "مدیریت صفحه معرفی فروشگاه",
      icon: BsInfoCircle,
      color: "text-yellow-700 bg-yellow-700/10",
    },
    {
      type: "purchase_guide",
      title: "راهنمای خرید",
      description: "مدیریت راهنمای خرید مشتریان",
      icon: TfiShoppingCartFull,
      color: "text-blue-700 bg-blue-700/10",
    },
    {
      type: "return_policy",
      title: "شرایط بازگشت کالا",
      description: "مدیریت قوانین مرجوعی",
      icon: TbCreditCardRefund,
      color: "text-orange-700 bg-orange-700/10",
    },
  ];

  return (
    <BaseCard
      CardHeaderProps={{
        title: "صفحات فروشگاه",
        icon: <TbWorldSearch />,
        tooltipTitle: "مدیریت صفحات محتوایی فروشگاه",
        tooltipDescription:
          "در این بخش می‌توانید صفحات ثابت و اطلاع‌رسانی فروشگاه مانند درباره ما، راهنمای خرید، قوانین بازگشت کالا و سوالات متداول را ایجاد، ویرایش و فعال یا غیرفعال کنید. این صفحات مستقیماً در سایت به کاربران نمایش داده می‌شوند و نقش مهمی در اعتمادسازی و راهنمایی مشتریان دارند.",
      }}
      bodyClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Store Pages */}
      {pages.map((page) => {
        const Icon = page.icon;

        return (
          <Link
            key={page.type}
            href={`/admin/store/store-pages/${page.type}`}
            className="cursor-pointer rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-all"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl ${page.color}`}
            >
              <Icon />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{page.title}</span>
              <span className="text-sm text-gray-500">{page.description}</span>
            </div>
          </Link>
        );
      })}

      {/* FAQ */}
      <Link
        href={"/admin/store/store-pages/faqs"}
        className="cursor-pointer rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-all"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl text-green-700 bg-green-700/10">
          <LuMessageCircleQuestion />
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">سوالات متداول</span>
          <span className="text-sm text-gray-500">مدیریت FAQ فروشگاه</span>
        </div>
      </Link>
    </BaseCard>
  );
};

export default AboutStore;
