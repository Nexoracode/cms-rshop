"use client";

import React from "react";
import BoxLink from "@/components/Admin/_settings/BoxLink";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { FiEdit, FiUsers, FiUser } from "react-icons/fi";
import { GrAnnounce } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { TbReportAnalytics, TbTruckDelivery } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineInformationCircle, HiOutlineAtSymbol } from "react-icons/hi";
import { HiOutlineDocumentText, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { RiListSettingsLine, RiTimerLine } from "react-icons/ri";
import { LuShoppingBag, LuPackage } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import ArShopCard from "@/components/Admin/ArShopCard";

// لینک‌های بالای بخش تنظیمات اصلی
const topLinks = [
    {
        title: "مشتریان",
        icon: <FiUsers className="text-2xl" />,
        route: "/admin/store/customers",
        parent: "text-purple-700 bg-purple-700/5 shadow-md",
        iconBg: "bg-purple-700/10",
    },
    {
        title: "گزارشات مالی",
        icon: <TbReportAnalytics className="text-2xl" />,
        route: "/admin/settings/finance",
        parent: "text-green-700 bg-green-700/5 shadow-md",
        iconBg: "bg-green-700/10",
    },
    {
        title: "دیدگاه‌ها",
        icon: <GoCommentDiscussion className="text-2xl" />,
        route: "/admin/store/comments",
        parent: "text-gray-700 bg-gray-700/5 shadow-md",
        iconBg: "bg-gray-700/10",
    },
    {
        title: "پروموشن‌ها",
        icon: <GrAnnounce className="text-2xl" />,
        route: "/admin/store/promotions",
        parent: "text-orange-700 bg-orange-700/5 shadow-md",
        iconBg: "bg-orange-700/10",
    },
];

// تنظیمات فروشگاه
const storeSettingsLinks = [
    {
        title: "حساب کاربری",
        icon: <FiUser className="text-2xl" />,
        route: "store/settings/user_infos",
    },
    {
        title: "اطلاعات فروشگاه",
        icon: <BsShop className="text-2xl" />,
        route: "store/settings/infos",
    },
    {
        title: "درباره فروشگاه",
        icon: <HiOutlineInformationCircle className="text-2xl" />,
        route: "store/settings/about-store",
    },
    {
        title: "شبکه‌های اجتماعی",
        icon: <IoShareSocialOutline className="text-2xl" />,
        route: "store/settings/social",
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
        title: "روش‌های پرداخت",
        icon: <PiMoneyWavy className="text-2xl" />,
        route: "store/payment",
    },
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
        <div>
            <div className="bg-gradient-to-l from-blue-100 via-purple-100 rounded-xl p-4 shadow-md">
                <ArShopCard>
                    <Button color="secondary" variant="flat" size="sm" className="py-5 rounded-xl">
                        <FiEdit className="text-lg" /> ویرایش
                    </Button>
                </ArShopCard>
                <div className="flex items-center justify-around mt-6">
                    {topLinks.map(({ title, icon, route, parent, iconBg }) => (
                        <BoxLink
                            key={route}
                            title={title}
                            icon={icon}
                            routeName={route}
                            parentStyle={parent}
                            iconStyle={iconBg}
                        />
                    ))}
                </div>
            </div>

            {/* کارت‌های تنظیمات پایین */}
            <div className="flex items-start justify-between gap-4 mt-8">
                {/* تنظیمات فروشگاه */}
                <Card className="shadow-md w-1/2">
                    <CardHeader className="flex items-center justify-between bg-gray-200">
                        <p className="text-gray-600">تنظیمات فروشگاه</p>
                        <RiListSettingsLine className="text-2xl text-gray-600" />
                    </CardHeader>
                    <CardBody className="grid grid-cols-3 gap-4">
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
                <Card className="shadow-md w-1/2">
                    <CardHeader className="flex items-center justify-between bg-blue-200">
                        <p className="text-blue-600">تنظیمات سفارش گیری</p>
                        <LuShoppingBag className="text-2xl text-blue-600" />
                    </CardHeader>
                    <CardBody className="grid grid-cols-3 gap-4">
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
        </div>
    );
};

export default Settings;
