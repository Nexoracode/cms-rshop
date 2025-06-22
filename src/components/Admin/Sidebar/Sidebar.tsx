"use client";

import Link from "next/link";
import React from "react";
import { HiOutlineHome } from "react-icons/hi";

export default function Sidebar() {
    return (
        <aside className="h-screen p-2">
            <div className="pt-6 pb-4 border-b flex items-center justify-center">
                <img src="/images/logo.png" alt="logo" className="w-24" />
            </div>

            <nav className="flex flex-col gap-4 text-end mt-4">
                <Link href="/admin/home" className="flex items-center justify-end text-md px-2 py-2 rounded-md hover:bg-green-700/5 transition hover:text-green-700">
                    <span className="px-2">خانه</span>
                    <div className="bg-green-700/10 text-green-700 rounded-md p-1">
                        <HiOutlineHome className="text-2xl" />
                    </div>
                </Link>
                <Link href="/admin/orders" className="text-sm font-medium">
                    سفارشات
                </Link>
                <Link href="/admin/products" className="text-sm font-medium">
                    محصولات
                </Link>
                <Link href="/admin/settings" className="text-sm font-medium">
                    تنظیمات
                </Link>
            </nav>
        </aside>
    );
}
