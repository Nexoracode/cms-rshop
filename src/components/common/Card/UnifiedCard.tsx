"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import SearchFilterCard, { SearchFilterCardProps } from "./SearchFilterCard";
import CardHeader, { CardHeaderProps } from "./CardHeader";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import BasePagination from "@/components/ui/BasePagination";
import { BiPackage, BiSearchAlt } from "react-icons/bi";

export type UnifiedCardProps = {
  headerProps: CardHeaderProps;
  searchFilterProps?: SearchFilterCardProps;
  tabsComponent?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  isLoading?: boolean;
  datas?: any;
  isExistItems?: boolean;
  searchInp?: boolean;
  childrenClassName?: string;
};

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  headerProps,
  searchFilterProps,
  tabsComponent,
  children,
  footer,
  className = "",
  bodyClassName = "",
  isLoading = false,
  datas,
  isExistItems = true,
  searchInp = false,
  childrenClassName = "",
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Search / Filter */}
      {searchFilterProps && <SearchFilterCard {...searchFilterProps} />}

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
                className={`flex flex-col justify-center gap-4 ${childrenClassName}`}
              >
                {children}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl text-gray-600 gap-2">
                {searchInp ? (
                  <>
                    <BiSearchAlt className="text-[50px] text-warning-500" />
                    <p className="text-center text-sm sm:text-base font-medium">
                      جستجوی شما نتیجه‌ای نداشت!!
                    </p>
                  </>
                ) : (
                  <>
                    <BiPackage className="text-[50px] text-gray-400" />
                    <p className="text-center text-sm sm:text-base font-medium">
                      هنوز موردی اضافه نشده است!!
                    </p>
                  </>
                )}
              </div>
            ))}
        </CardBody>

        {/* Footer */}
        {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
      </Card>

      {/* Pagination */}
      {datas?.data?.meta && <BasePagination meta={datas.data.meta} />}
    </div>
  );
};

export default UnifiedCard;
