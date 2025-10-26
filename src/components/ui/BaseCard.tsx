"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import Link from "next/link";

type BaseCardProps = {
  className?: string;
  bodyClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  redirect?: string;
  children: React.ReactNode;
};

const BaseCard: React.FC<BaseCardProps> = ({
  className = "",
  bodyClassName = "",
  redirect = "",
  onClick,
  children,
}) => {
  const CardContent = (
    <Card className={`relative border shadow-md !transition-all duration-300 hover:shadow-none ${className}`}>
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
