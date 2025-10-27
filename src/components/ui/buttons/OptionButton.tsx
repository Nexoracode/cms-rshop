"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

export type OptionButtonProps = {
  icon?: React.ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?:
    | "bordered"
    | "faded"
    | "flat"
    | "ghost"
    | "light"
    | "shadow"
    | "solid";
  isDisabled?: boolean;
  isLoading?: boolean;
};

const OptionButton: React.FC<OptionButtonProps> = ({
  icon,
  title,
  href,
  onClick,
  className = "",
  size = "sm",
  variant = "flat",
  isDisabled = false,
  isLoading = false,
}) => {
  return href ? (
    <Button
      as={Link}
      href={href}
      variant={variant}
      size={size}
      className={`w-fit rounded-lg ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-lg">{icon ? icon : <GoArrowUpRight />}</span>
        <span className="text-[13px]">{title}</span>
      </div>
    </Button>
  ) : (
    <Button
      onPress={onClick}
      variant={variant}
      size={size}
      className={`w-fit rounded-lg ${className}`}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-[13px]">{title}</span>
      </div>
    </Button>
  );
};

export default OptionButton;
