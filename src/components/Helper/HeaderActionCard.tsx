"use client";

import { Tooltip } from "@heroui/react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { ReactNode } from "react";

type HeaderActionCardProps = {
  icon: ReactNode;
  title: string;
  keyTitle: string;
  onAdd: () => void;
};

const HeaderActionCard: React.FC<HeaderActionCardProps> = ({
  icon,
  title,
  keyTitle,
  onAdd,
}) => {
  return (
    <div className="w-full flex items-center border-b shadow-md p-3 animate-appearance-in bg-gray-50 rounded-xl mb-6 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[15px] text-gray-600">{title}</p>
      </div>

      <Tooltip
        color="foreground"
        content={`افزودن ${keyTitle} جدید`}
        placement="right"
        closeDelay={1000}
        showArrow
      >
        <div
          className="bg-gray-200 rounded-md p-1.5 cursor-pointer"
          onClick={onAdd}
        >
          <HiOutlineSquaresPlus className="text-2xl" />
        </div>
      </Tooltip>
    </div>
  );
};

export default HeaderActionCard;
