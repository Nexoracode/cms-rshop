"use client";

import Link from "next/link";
import React from "react";

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
    <div className="w-full flex items-center bg-gray-50 border-b p-3 rounded-xl mt-4 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[16px] text-gray-600">{title}</p>
      </div>

      <Link href={navigateTo} className="bg-purple-100 rounded-xl p-2 animate-bounce text-purple-500">
        {!link ? navigateTitle : link}
      </Link>
    </div>
  );
};

export default HeaderNavigator;
