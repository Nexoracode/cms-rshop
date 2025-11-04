"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import Link from "next/link";
import CardHeader, { CardHeaderProps } from "../common/Card/CardHeader";
import EmptyStateCard from "../feedback/EmptyStateCard";

type BaseCardProps = {
  CardHeaderProps?: CardHeaderProps;
  className?: string;
  bodyClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  redirect?: string;
  children: React.ReactNode;
  wrapperContents?: boolean;
  isLoading?: boolean;
};

const BaseCard: React.FC<BaseCardProps> = ({
  className = "",
  bodyClassName = "",
  wrapperContents = false,
  redirect = "",
  onClick,
  children,
  CardHeaderProps,
  isLoading = false,
}) => {
  const CardContent = (
    <Card
      className={`relative border shadow-md !transition-all duration-300 hover:shadow-none ${className}`}
    >
      {CardHeaderProps && <CardHeader {...CardHeaderProps} />}
      <CardBody
        className={`relative p-2 cursor-pointer text-right ${bodyClassName} ${
          wrapperContents ? "flex flex-col p-4 gap-6" : ""
        } ${isLoading ? "opacity-50 !cursor-auto pointer-events-none" : ""}`}
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
