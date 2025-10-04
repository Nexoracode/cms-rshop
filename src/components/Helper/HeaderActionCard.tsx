"use client";

import { ReactNode } from "react";

type HeaderActionCardProps = {
  icon: ReactNode;
  title: string;
  onAdd: () => void;
};

const HeaderActionCard: React.FC<HeaderActionCardProps> = ({
  icon,
  title,
  onAdd,
}) => {
  return (
    <div className="w-full flex items-center border-b shadow-md p-3 animate-appearance-in bg-gray-50 rounded-xl mb-6 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[15px] text-gray-600">{title}</p>
      </div>

      <div
        className="bg-gray-800 animate-bounce rounded-xl p-2 px-4 cursor-pointer text-white"
        onClick={onAdd}
      >
        + افزودن
      </div>
    </div>
  );
};

export default HeaderActionCard;
