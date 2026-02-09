"use client";

import React from "react";
import BoxLink from "@/components/shared/BoxLink";
import { BsShop } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";
import { HiOutlineInformationCircle } from "react-icons/hi";
import {
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { RiTimerLine } from "react-icons/ri";
import { LuPackage, LuSettings2 } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbChartDots, TbLoader, TbTruckDelivery } from "react-icons/tb";
import BaseCard from "@/components/ui/BaseCard";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";

const storeSettingsLinks = [
  {
    title: "اطلاعات فروشگاه",
    icon: <BsShop className="text-2xl" />,
    route: "store/infos",
  },
  {
    title: "صفحه اصلی",
    icon: <SiMaterialformkdocs className="text-2xl" />,
    route: "store/home-builder",
  },
  {
    title: "گزارش عملکرد",
    icon: <TbChartDots className="text-2xl" />,
    route: "store/analytics",
  },
  {
    title: "درباره فروشگاه",
    icon: <HiOutlineInformationCircle className="text-2xl" />,
    route: "store/about-store",
  },
  {
    title: "بلاگ‌ها",
    icon: <HiOutlineDocumentText className="text-2xl" />,
    route: "store/blog",
    badge: "به زودی",
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
    title: "زمان رزرو",
    icon: <RiTimerLine className="text-2xl" />,
    route: "store/reservation-times",
  },
  {
    title: "پیش‌سفارش",
    icon: <HiOutlineClipboardDocumentCheck className="text-2xl" />,
    route: "store",
    badge: "به زودی",
  },
  {
    title: "روش‌های ارسال",
    icon: <TbTruckDelivery className="text-2xl" />,
    route: "store/#",
    badge: "به زودی",
  },
];

const Settings: React.FC = () => {
  return (
    <>
      <ShopInfosCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        <BaseCard
          className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full rounded-2xl"
          CardHeaderProps={{
            title: "تنظیمات فروشگاه",
            icon: <LuSettings2 className="text-[24px]" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="grid grid-cols-2 sm:grid-cols-3 items-center gap-4 mb-3"
        >
          {storeSettingsLinks.map(({ title, icon, route, badge }) => (
            <div key={route} className="relative">
              <BoxLink
                title={title}
                icon={icon}
                routeName={route}
                parentStyle="text-gray-700"
                titleStyle="text-gray-600"
              />
              {badge ? (
                <div className="absolute top-2 -left-4 w-full flex items-center justify-center">
                  <TbLoader className="animate-spin text-yellow-600" size={16} />
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </BaseCard>

        <BaseCard
          className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full rounded-2xl"
          CardHeaderProps={{
            title: "تنظیمات سفارش گیری",
            icon: <IoReceiptOutline className="text-[26px]" />,
            showIconInActionSlot: true,
          }}
          bodyClassName="grid grid-cols-2 sm:grid-cols-3 items-center gap-4 mb-3"
        >
          {orderSettingsLinks.map(({ title, icon, route, badge }) => (
            <div key={route} className="relative">
              <BoxLink
                title={title}
                icon={icon}
                routeName={route}
                parentStyle="text-blue-700"
                titleStyle="text-gray-600"
              />
              {badge ? (
                <div className="absolute top-2 -left-4 w-full flex items-center justify-center">
                  <TbLoader className="animate-spin text-yellow-600" size={16} />
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </BaseCard>
      </div>
    </>
  );
};

export default Settings;
