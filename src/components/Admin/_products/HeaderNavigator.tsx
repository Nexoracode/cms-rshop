"use client";

import { Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { VscGithubAction } from "react-icons/vsc";

type HeaderNavigatorProps = {
  title: string;
  tooltipTitle: string;
  navigateTo: string;
  icon: React.ReactNode;
  link?: string | React.ReactNode;
};

const HeaderNavigator: React.FC<HeaderNavigatorProps> = ({
  title,
  icon,
  navigateTo,
  link,
  tooltipTitle,
}) => {
  return (
    <div className="w-full flex items-center border-b p-3 bg-gray-50 rounded-xl mt-4 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[16px] text-gray-600">{title}</p>
      </div>

      <Tooltip
        color="foreground"
        content={tooltipTitle}
        placement="right"
        closeDelay={1000}
        showArrow
      >
        <Link href={navigateTo} className="bg-gray-200 rounded-md p-1.5">
          {!link ? <VscGithubAction className="text-2xl" /> : link}
        </Link>
      </Tooltip>
    </div>
  );
};

export default HeaderNavigator;
