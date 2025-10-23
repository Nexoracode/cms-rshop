"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import SearchFilterCard, { SearchFilterCardProps } from "./SearchFilterCard";
import CardHeader, { CardHeaderProps } from "./CardHeader";

export type MainCardProps = {
  headerProps: CardHeaderProps;
  searchFilterProps?: SearchFilterCardProps;
  tabsComponent?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  scrollableBody?: boolean;
};

const MainCard: React.FC<MainCardProps> = ({
  headerProps,
  searchFilterProps,
  tabsComponent,
  children,
  footer,
  className = "",
  bodyClassName = "",
  scrollableBody = false,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {searchFilterProps && <SearchFilterCard {...searchFilterProps} />}

      <Card className={`w-full shadow-md ${className}`}>
        <CardHeader {...headerProps}/>

        <CardBody
          dir="rtl"
          className={`flex flex-col gap-6 text-start ${bodyClassName} ${
            scrollableBody ? "overflow-auto max-h-[600px]" : ""
          }`}
        >
          {tabsComponent && <div>{tabsComponent}</div>}
          {!tabsComponent && children}
        </CardBody>

        {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
      </Card>
    </div>
  );
};

export default MainCard;
