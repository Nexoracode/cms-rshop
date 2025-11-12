"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import {
  TbMessage,
  TbRosetteDiscount,
  TbShoppingCartDiscount,
} from "react-icons/tb";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { BsBasket } from "react-icons/bs";
import MenuCard from "@/components/shared/MenuCard";
import { GiPartyPopper } from "react-icons/gi";

const promotionItems = [
  {
    title: "کد تخفیف",
    subtitle: "تعریف کد تخفیف نقدی یا درصدی",
    icon: <TbRosetteDiscount className="text-3xl" />,
    color: "text-purple-700 bg-purple-700/10",
    path: "/admin/store/promotions/coupon",
  },
  {
    title: "تخفیف خرید بعدی",
    subtitle: "ارسال پیامک تخفیف برای خرید بعدی مشتری",
    icon: <TbShoppingCartDiscount className="text-3xl" />,
    color: "text-green-700 bg-green-700/10",
    path: "/admin/store/promotions/next-purchase",
  },
  {
    title: "پیشنهاد شگفت‌انگیز",
    subtitle: "پیشنهادهای جذاب برای مشتریان موردنظر",
    icon: <BsBasket className="text-3xl" />,
    color: "text-red-700 bg-red-700/10",
    path: "/admin/store/promotions/amazing-offer",
  },
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
];

const PromotionsListModal: React.FC = () => {
  return (
    <BaseModal
      title="انواع پروموشن ها"
      triggerProps={{
        title: "+ افزودن پروموشن",
        className: "bg-secondary-light text-secondary",
      }}
      isActiveFooter={false}
      icon={<GiPartyPopper className="text-3xl" />}
      size="xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
        {promotionItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color}
            path={item.path}
          />
        ))}
      </div>
    </BaseModal>
  );
};

export default PromotionsListModal;
