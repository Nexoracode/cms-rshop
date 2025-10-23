"use client";

import { ReactNode } from "react";
import { CardHeader } from "@heroui/react";

export type UnifiedHeaderProps = {
  icon: ReactNode;
  title: string;
  textSize?: string;
  children?: React.ReactNode;
};

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  icon,
  title,
  textSize,
  children,
}) => {
  return (
    <CardHeader className="flex gap-3">
      <div
        className={`w-full rounded-xl p-2 flex items-center justify-between bg-slate-50`}
      >
        <p
          className={`${
            textSize ? textSize : "text-[14px]"
          } leading-7 flex items-center gap-2`}
        >
          <span className="text-3xl">{icon}</span>
          {title}
        </p>
        <div>{children}</div>
      </div>
    </CardHeader>
  );
};

export default UnifiedHeader;
