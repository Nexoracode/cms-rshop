"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

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
};

const OptionButton: React.FC<OptionButtonProps> = ({
  icon,
  title,
  href,
  onClick,
  className = "",
  size = "sm",
  variant = "flat",
}) => {
  const content = (
    <div className="flex items-center gap-2">
      {icon && <span className="text-xl">{icon}</span>}
      <span>{title}</span>
    </div>
  );

  return href ? (
    <Button
      as={Link}
      href={href}
      variant={variant}
      size={size}
      className={`pl-5 ${className}`}
    >
      {content}
    </Button>
  ) : (
    <Button
      onPress={onClick}
      variant={variant}
      size={size}
      className={`pl-5 ${className}`}
    >
      {content}
    </Button>
  );
};

export default OptionButton;
