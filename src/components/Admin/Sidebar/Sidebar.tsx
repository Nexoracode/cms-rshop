"use client";

import Link from "next/link";
import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { IoReceiptOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import Item from "./Item";

export default function Sidebar() {
    return (
        <aside className="h-screen p-2">
            <div className="pt-6 pb-4 border-b flex items-center justify-center">
                <img src="/images/logo.png" alt="logo" className="w-24" />
            </div>

            <nav className="flex flex-col gap-4 text-end mt-4">
                <Item
                    title="خانه"
                    icon={<HiOutlineHome className="text-2xl" />}
                    routeName="home"
                    parentStyle="text-green-700 hover:text-green-700 hover:bg-green-700/5"
                    iconStyle="bg-green-700/10"
                />
                <Item
                    title="سفارشات"
                    icon={<IoReceiptOutline className="text-2xl" />}
                    routeName="orders"
                    parentStyle="text-blue-700 hover:text-blue-700 hover:bg-blue-700/5"
                    iconStyle="bg-blue-700/10"
                />
                <Item
                    title="محصولات"
                    icon={<AiOutlineShop className="text-2xl" />}
                    routeName="products"
                    parentStyle="text-orange-700 hover:text-orange-700 hover:bg-orange-700/5"
                    iconStyle="bg-orange-700/10"
                />
                <Item
                    title="تنظیمات"
                    icon={<IoSettingsOutline className="text-2xl" />}
                    routeName="settings"
                    parentStyle="text-sky-700 hover:text-sky-700 hover:bg-sky-700/5"
                    iconStyle="bg-sky-700/10"
                />
            </nav>
        </aside>
    );
}
