"use client";

import { ModalHeader, Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { VscGithubAction } from "react-icons/vsc";

type ModalHeaderNavigatorProps = {
  title: string;
  mainTitle: string;
  navigateTo: string;
  icon: React.ReactNode;
};

const ModalHeaderNavigator: React.FC<ModalHeaderNavigatorProps> = ({
  title,
  icon,
  navigateTo,
  mainTitle,
}) => {
  return (
    <div className="w-full flex items-center border-b p-3 bg-gray-50 rounded-xl mt-4 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[15px] text-gray-600">{title}</p>
      </div>

      <Tooltip
        color="foreground"
        content={`مدیریت کامل ${mainTitle}`}
        placement="right"
        closeDelay={1000}
        showArrow
      >
        <Link href={navigateTo} className="bg-gray-200 rounded-md p-1.5">
          <VscGithubAction className="text-2xl" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default ModalHeaderNavigator;
