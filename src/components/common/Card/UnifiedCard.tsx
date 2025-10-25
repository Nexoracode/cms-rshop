"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import CardHeader, { CardHeaderProps } from "./CardHeader";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import BasePagination from "@/components/ui/BasePagination";
import { BiSearchAlt } from "react-icons/bi";
import EmptyStateCard from "@/components/feedback/EmptyStateCard";

export type UnifiedCardProps = {
  headerProps: CardHeaderProps;
  searchFilter?: React.ReactNode;
  tabsComponent?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  isLoading?: boolean;
  meta?: any;
  isExistItems?: boolean;
  searchInp?: boolean;
  childrenClassName?: string;
};

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  headerProps,
  searchFilter,
  tabsComponent,
  children,
  footer,
  className = "",
  bodyClassName = "",
  isLoading = false,
  meta,
  isExistItems = true,
  searchInp = false,
  childrenClassName = "",
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Search / Filter */}
      {searchFilter && searchFilter}

      <Card className={`w-full shadow-md ${className}`}>
        {/* Header */}
        <CardHeader {...headerProps} />

        {/* Body */}
        <CardBody
          dir="rtl"
          className={`flex flex-col gap-6 text-start ${bodyClassName}`}
        >
          {/* Tabs */}
          {tabsComponent && <div>{tabsComponent}</div>}

          {/* محتوا یا حالت لودینگ / خالی */}
          {!tabsComponent &&
            (isLoading ? (
              <LoadingApiCall />
            ) : isExistItems ? (
              <div
                className={`flex flex-col justify-center items-center gap-4 ${childrenClassName}`}
              >
                {children}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl text-gray-600 gap-2">
                {searchInp ? (
                  <EmptyStateCard
                    message="جستجو شما نتیجه ای نداشت!!"
                    icon={<BiSearchAlt className="text-warning-500" />}
                  />
                ) : (
                  <EmptyStateCard />
                )}
              </div>
            ))}
        </CardBody>

        {/* Footer */}
        {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
      </Card>

      {/* Pagination */}
      {meta && <BasePagination meta={meta} />}
    </div>
  );
};

export default UnifiedCard;
