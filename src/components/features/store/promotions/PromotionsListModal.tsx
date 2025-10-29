"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BaseModal from "@/components/ui/modals/BaseModal";
import {
  TbMessage,
  TbRosetteDiscount,
  TbShoppingCartDiscount,
} from "react-icons/tb";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { BsBasket } from "react-icons/bs";

const promotionItems = [
  {
    title: "خرید اول",
    subtitle: "مخصوص مشتریانی که برای بار اول می‌خواهند از شما خرید کنند",
    icon: <TfiShoppingCartFull className="text-3xl" />,
    color: "text-yellow-700 bg-yellow-700/10",
    path: "/admin/store/promotions/first-purchase",
  },
  {
    title: "ارسال رایگان",
    subtitle: "تعریف تخفیف برای ارسال رایگان.",
    icon: <LiaTruckLoadingSolid className="text-3xl" />,
    color: "text-blue-700 bg-blue-700/10",
    path: "/admin/store/promotions/free-shipping",
  },
  {
    title: "ارسال پیامک",
    subtitle: "ارسال پیامک‌های متنوع و مختلف برای مشتریانتان.",
    icon: <TbMessage className="text-3xl" />,
    color: "text-orange-700 bg-orange-700/10",
    path: "/admin/store/promotions/sms",
  },
  {
    title: "تخفیف خرید بعدی",
    subtitle: "ارسال پیامک تخفیف برای خرید بعدی مشتری",
    icon: <TbShoppingCartDiscount className="text-3xl" />,
    color: "text-green-700 bg-green-700/10",
    path: "/admin/store/promotions/next-purchase",
  },
  {
    title: "کد تخفیف",
    subtitle: "تعریف کد تخفیف نقدی یا درصدی",
    icon: <TbRosetteDiscount className="text-3xl" />,
    color: "text-purple-700 bg-purple-700/10",
    path: "/admin/store/promotions/coupon",
  },
  {
    title: "پیشنهاد شگفت‌انگیز",
    subtitle: "پیشنهادهای جذاب برای مشتری",
    icon: <BsBasket className="text-3xl" />,
    color: "text-red-700 bg-red-700/10",
    path: "/admin/store/promotions/amazing-offer",
  },
];

const PromotionsListModal: React.FC = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <BaseModal
      title="انواع پروموشن ها"
      triggerProps={{
        title: "+ افزودن پروموشن",
        className: "bg-secondary-light text-secondary"
      }}
      confirmText="بستن"
      cancelText=""
      isActiveFooter={false}
      size="xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
        {promotionItems.map((item) => (
          <div
            key={item.title}
            onClick={() => handleClick(item.path)}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.color}`}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </BaseModal>
  );
};

export default PromotionsListModal;