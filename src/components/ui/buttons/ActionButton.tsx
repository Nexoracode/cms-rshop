"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ActionButtonProps = {
  icon: React.ReactNode;
  route?: string;
  onClick?: () => void;
  className?: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  route,
  onClick,
  className,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation();
    if (route) {
      router.push(route);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all ${className || ""}`}
    >
      {icon}
    </button>
  );
};
