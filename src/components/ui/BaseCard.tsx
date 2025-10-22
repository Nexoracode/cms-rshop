"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import Link from "next/link";

type BaseCardProps = {
  selected?: boolean;
  className?: string;
  bodyClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  redirect?: string;
  children: React.ReactNode;
};

const BaseCard: React.FC<BaseCardProps> = ({
  selected = false,
  className = "",
  bodyClassName = "",
  redirect = "",
  onClick,
  children,
}) => {
  const [hovered, setHovered] = useState(false);

  const CardContent = (
    <Card
      isBlurred
      className={`relative border shadow-[0_0_7px_lightgray] !transition-all duration-300 hover:opacity-80
        ${selected ? "border-sky-500 scale-[0.98]" : "border-gray-200"}
        ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardBody
        className={`relative p-2 cursor-pointer ${bodyClassName}`}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        {children}
      </CardBody>
    </Card>
  );

  return redirect ? <Link href={redirect}>{CardContent}</Link> : CardContent;
};

export default BaseCard;
