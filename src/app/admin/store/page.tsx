"use client";

import React from "react";
import BoxLink from "@/components/Admin/_settings/BoxLink";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { FiUser } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi";
import {
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { RiListSettingsLine, RiTimerLine } from "react-icons/ri";
import { LuShoppingBag, LuPackage } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

// تنظیمات فروشگاه
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

// تنظیمات سفارش گیری
const orderSettingsLinks = [
  {
    title: "روش‌های ارسال",
    icon: <TbTruckDelivery className="text-2xl" />,
    route: "store/shippings",
  },
  {
    title: "بسته‌بندی",
    icon: <LuPackage className="text-2xl" />,
    route: "store/pockets",
  },
  {
    title: "تأیید خودکار",
    icon: <MdOutlineVerifiedUser className="text-2xl" />,
    route: "store/auto-approval",
  },
  {
    title: "پیش‌سفارش",
    icon: <HiOutlineClipboardDocumentCheck className="text-2xl" />,
    route: "store/pre-order",
  },
  {
    title: "زمان رزرو",
    icon: <RiTimerLine className="text-2xl" />,
    route: "store/reservation-times",
  },
];

const Settings: React.FC = () => {
  return (
    <>
      <div className="flex justify-center flex-col sm:flex-row lg:items-start lg:justify-between gap-4">
        {/* تنظیمات فروشگاه */}
        <Card className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full lg:w-1/2">
          <CardHeader className="flex items-center justify-between bg-gray-200">
            <p className="text-gray-600">تنظیمات فروشگاه</p>
            <RiListSettingsLine className="text-2xl text-gray-600" />
          </CardHeader>
          <CardBody className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 items-center md:grid-cols-3 gap-4">
            {storeSettingsLinks.map(({ title, icon, route }) => (
              <BoxLink
                key={route}
                title={title}
                icon={icon}
                routeName={route}
                parentStyle="text-purple-700"
                iconStyle="bg-gray-700/10"
                titleStyle="text-gray-600"
              />
            ))}
          </CardBody>
        </Card>

        {/* تنظیمات سفارش گیری */}
        <Card className="shadow-md mx-auto sm:mx-0 max-w-[392px] w-full lg:w-1/2">
          <CardHeader className="flex items-center justify-between bg-blue-200">
            <p className="text-blue-600">تنظیمات سفارش گیری</p>
            <LuShoppingBag className="text-2xl text-blue-600" />
          </CardHeader>
          <CardBody className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 items-center md:grid-cols-3 gap-4">
            {orderSettingsLinks.map(({ title, icon, route }) => (
              <BoxLink
                key={route}
                title={title}
                icon={icon}
                routeName={route}
                parentStyle="text-blue-700"
                iconStyle="bg-gray-700/10"
                titleStyle="text-gray-600"
              />
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Settings;
