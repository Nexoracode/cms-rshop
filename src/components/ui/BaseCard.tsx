"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import Link from "next/link";
import CardHeader, { CardHeaderProps } from "../common/Card/CardHeader";

type BaseCardProps = {
  CardHeaderProps?: CardHeaderProps;
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
  CardHeaderProps,
}) => {
  const CardContent = (
    <Card
      className={`relative border shadow-md !transition-all duration-300 hover:shadow-none ${className}`}
    >
      {CardHeaderProps && <CardHeader {...CardHeaderProps} />}
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
