"use client";

import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

type HeaderNavigatorProps = {
  title: string;
  navigateTitle: string;
  navigateTo: string;
  icon: React.ReactNode;
  link?: string | React.ReactNode;
};

const HeaderNavigator: React.FC<HeaderNavigatorProps> = ({
  title,
  icon,
  navigateTo,
  link,
  navigateTitle,
}) => {
  return (
    <div className="w-full flex items-center bg-transparent border-b p-2 rounded-xl mt-4 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[16px] text-gray-600">{title}</p>
      </div>

      <Link href={navigateTo} className="bg-gray-200 flex items-center gap-1 rounded-lg px-3 py-1 text-[15px] font-normal">
        <GoArrowUpRight className="text-lg" />
        {!link ? navigateTitle : link}
      </Link>
    </div>
  );
};

export default HeaderNavigator;
