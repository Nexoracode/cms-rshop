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
    <div className="w-full flex items-center bg-slate-50 p-2 rounded-xl mb-6 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[15px] text-gray-600">{title}</p>
      </div>

      <div
        className="bg-sky-100 text-sky-600 rounded-xl p-2 px-4 cursor-pointer"
        onClick={onAdd}
      >
        + افزودن
      </div>
    </div>
  );
};

export default HeaderActionCard;
