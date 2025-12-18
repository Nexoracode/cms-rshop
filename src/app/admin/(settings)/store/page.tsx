"use client";

import React from "react";
import BoxLink from "@/components/shared/BoxLink";
import { Card, CardBody } from "@heroui/react";
import { FiUser } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { IoReceiptOutline, IoShareSocialOutline } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";
import { HiOutlineInformationCircle } from "react-icons/hi";
import {
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { RiTimerLine } from "react-icons/ri";
import { LuPackage, LuSettings2 } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import CardHeader from "@/components/common/Card/CardHeader";
import BaseCard from "@/components/ui/BaseCard";

const storeSettingsLinks = [
  {
    title: "حساب کاربری",
    icon: <FiUser className="text-2xl" />,
    route: "settings/user-infos",
  },
  {
    title: "اطلاعات فروشگاه",
    icon: <BsShop className="text-2xl" />,
    route: "settings/infos",
  },
  {
    title: "درباره فروشگاه",
    icon: <HiOutlineInformationCircle className="text-2xl" />,
    route: "settings/about-store",
  },
  {
    title: "شبکه‌های اجتماعی",
    icon: <IoShareSocialOutline className="text-2xl" />,
    route: "settings/social",
  },
  {
    title: "بلاگ‌ها",
    icon: <HiOutlineDocumentText className="text-2xl" />,
    route: "store/blog",
  },
];

const homePage = [
  {
    title: "اسلایدرهای اصلی",
    icon: <FiUser className="text-2xl" />,
    route: "home/hero-sliders",
  },
  {
    title: "بنرهای جانبی",
    icon: <FiUser className="text-2xl" />,
    route: "home/side-banners",
  },
  {
    title: "چینش صفحه اصلی",
    icon: <FiUser className="text-2xl" />,
    route: "home/sections",
  },
  {
    title: "گزارش عملکرد",
    icon: <FiUser className="text-2xl" />,
    route: "home/analytics",
  },
];

// تنظیمات سفارش گیری
const orderSettingsLinks = [
  {
    title: "بسته‌بندی",
    icon: <LuPackage className="text-2xl" />,
    route: "store/gift-wrapping",
  },
  {
    title: "تأیید خودکار",
    icon: <MdOutlineVerifiedUser className="text-2xl" />,
    route: "store/auto-approval",
  },
  {
    title: "زمان رزرو",
    icon: <RiTimerLine className="text-2xl" />,
    route: "store/reservation-times",
  },
  {
    title: "پیش‌سفارش",
    icon: <HiOutlineClipboardDocumentCheck className="text-2xl" />,
    route: "store/pre-order",
  },
  {
    title: "روش‌های ارسال",
    icon: <TbTruckDelivery className="text-2xl" />,
    route: "store/shippings",
  },
];

const Settings: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <BaseCard
        className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full rounded-2xl"
        CardHeaderProps={{
          title: "تنظیمات صفحه اصلی",
          icon: <SiMaterialformkdocs className="text-[24px]" />,
          showIconInActionSlot: true,
        }}
        bodyClassName="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 items-center md:grid-cols-3 gap-4"
      >
        {homePage.map(({ title, icon, route }) => (
          <BoxLink
            key={route}
            title={title}
            icon={icon}
            routeName={route}
            parentStyle="text-gray-700"
            titleStyle="text-gray-600"
          />
        ))}
      </BaseCard>

      <BaseCard
        className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full rounded-2xl"
        CardHeaderProps={{
          title: "تنظیمات سفارش گیری",
          icon: <IoReceiptOutline className="text-[26px]" />,
          showIconInActionSlot: true,
        }}
        bodyClassName="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 items-center md:grid-cols-3 gap-4"
      >
        {orderSettingsLinks.map(({ title, icon, route }) => (
          <BoxLink
            key={route}
            title={title}
            icon={icon}
            routeName={route}
            parentStyle="text-blue-700"
            titleStyle="text-gray-600"
          />
        ))}
      </BaseCard>

      <BaseCard
        className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full rounded-2xl"
        CardHeaderProps={{
          title: "تنظیمات فروشگاه",
          icon: <LuSettings2 className="text-[24px]" />,
          showIconInActionSlot: true,
        }}
        bodyClassName="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 items-center md:grid-cols-3 gap-4"
      >
        {storeSettingsLinks.map(({ title, icon, route }) => (
          <BoxLink
            key={route}
            title={title}
            icon={icon}
            routeName={route}
            parentStyle="text-gray-700"
            titleStyle="text-gray-600"
          />
        ))}
      </BaseCard>
    </div>
  );
};

export default Settings;
