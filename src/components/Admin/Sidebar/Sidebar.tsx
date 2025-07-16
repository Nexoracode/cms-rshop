"use client";

import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { IoReceiptOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import Item from "./Item";

export default function Sidebar() {
    return (
        <aside className="h-fit lg:h-[calc(100vh-24px)] sticky top-3 p-2 bg-white shadow-lg mt-6 rounded-3xl bg-gradient-to-r from-white via-slate-100">
            <div className="hidden lg:flex pt-6 pb-4 border-b items-center justify-center">
                <img src="/images/logo.png" alt="logo" className="w-28" />
            </div>

            <nav className="bg-white p-3 lg:p-0 rounded-t-3xl fixed bottom-0 left-0 right-0 lg:relative lg:bg-transparent flex flex-row lg:flex-col gap-4 text-end mt-4">
                <Item
                    title="خانه"
                    icon={<HiOutlineHome className="text-2xl animate-pulse" />}
                    routeName="home"
                    parentStyle="text-green-700 w-full hover:text-green-700 hover:bg-green-700/5"
                    iconStyle="bg-green-700/10"
                    active="bg-green-700/5"
                />
                <Item
                    title="سفارشات"
                    icon={<IoReceiptOutline className="text-2xl animate-bounce" />}
                    routeName="orders"
                    parentStyle="text-blue-700 w-full hover:text-blue-700 hover:bg-blue-700/5"
                    iconStyle="bg-blue-700/10"
                    active="bg-blue-700/5"
                />
                <Item
                    title="محصولات"
                    icon={<AiOutlineShop className="text-2xl animate-blink" />}
                    routeName="products"
                    parentStyle="text-orange-700 w-full hover:text-orange-700 hover:bg-orange-700/5"
                    iconStyle="bg-orange-700/10"
                    active="bg-orange-700/5"
                />
                <Item
                    title="تنظیمات"
                    icon={<IoSettingsOutline className="text-2xl animate-spin" />}
                    routeName="store"
                    parentStyle="text-sky-700 w-full hover:text-sky-700 hover:bg-sky-700/5"
                    iconStyle="bg-sky-700/10"
                    active="bg-sky-700/5"
                />
            </nav>
        </aside>
    );
}
