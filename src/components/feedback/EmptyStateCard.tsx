"use client";

import React from "react";
import { BiPackage } from "react-icons/bi";

type EmptyStateCardProps = {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
};

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  message = "هنوز موردی اضافه نشده است!!",
  icon = <BiPackage className="text-[50px] text-gray-400" />,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl text-gray-600 gap-2 ${className}`}
    >
      <span className="animate-bounce text-[50px]">{icon}</span>
      <p className="text-center text-sm sm:text-base font-medium">{message}</p>
    </div>
  );
};

export default EmptyStateCard;
