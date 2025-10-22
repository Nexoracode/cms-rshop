"use client";

import { ReactNode } from "react";
import Link from "next/link";

type HeaderActionCardProps = {
  icon: ReactNode;
  title: string;
  textBtn?: string;
  onAdd?: () => void;
  redirect?: string;
};

const HeaderActionEntity: React.FC<HeaderActionCardProps> = ({
  icon,
  title,
  onAdd,
  textBtn = "+ افزودن",
  redirect,
}) => {
  const ButtonContent = (
    <div className="bg-sky-100 text-sky-600 rounded-xl p-2 px-4 cursor-pointer">
      {textBtn}
    </div>
  );

  return (
    <div className="w-full flex items-center bg-slate-50 p-2 rounded-xl mb-6 justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-normal text-[15px] text-gray-600">{title}</p>
      </div>

      {redirect ? (
        <Link href={redirect}>{ButtonContent}</Link>
      ) : (
        <div onClick={onAdd}>{ButtonContent}</div>
      )}
    </div>
  );
};

export default HeaderActionEntity;
