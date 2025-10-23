"use client";

import { CardHeader as CardHeaderHero } from "@heroui/react";

export type CardHeaderProps = {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  title,
  children,
}) => {
  return (
    <CardHeaderHero className="flex gap-3">
      <div
        className={`w-full rounded-xl p-2 flex items-center justify-between bg-slate-50`}
      >
        <p
          className={`text-[14px] leading-7 flex items-center gap-2`}
        >
          <span className="text-3xl">{icon}</span>
          {title}
        </p>
        <div>{children}</div>
      </div>
    </CardHeaderHero>
  );
};

export default CardHeader;
