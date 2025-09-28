"use client";

import { Card, CardBody, Tooltip } from "@heroui/react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import LoadingApiCall from "../Helper/LoadingApiCall";
import AppPagination from "../Helper/AppPagination";

type CardContentProps = {
  icon?: any;
  title: string;
  keyTitle: string;
  onAdd: () => void;
  isLoading: boolean;
  datas: any;
  header?: any;
  children: React.ReactNode;
  searchInp?: boolean;
  styleContent?: string;
  isExistItems: boolean;
};

const CardContent: React.FC<CardContentProps> = ({
  keyTitle,
  title,
  icon,
  onAdd,
  isLoading,
  datas,
  header,
  children,
  searchInp,
  styleContent,
  isExistItems,
}) => {
  return (
    <section className="flex flex-col gap-6">
      {header}
      <Card>
        <CardBody className="overflow-hidden">
          <div className="w-full flex items-center border-b shadow-md p-3 animate-appearance-in bg-gray-50 rounded-xl mb-6 justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <p className="font-normal text-[15px] text-gray-600">{title}</p>
            </div>

            <Tooltip
              color="foreground"
              content={`افزودن ${keyTitle} جدید`}
              placement="right"
              closeDelay={1000}
              showArrow
            >
              <div
                className="bg-gray-200 rounded-md p-1.5 cursor-pointer"
                onClick={onAdd}
              >
                <HiOutlineSquaresPlus className="text-2xl" />
              </div>
            </Tooltip>
          </div>

          {isLoading ? (
            <LoadingApiCall />
          ) : isExistItems ? (
            <div className={styleContent}>{children}</div>
          ) : (
            <p className="text-center py-6">
              {searchInp ? "سرچ شمل نتیجه ای نداشت" : "هنوز آیتمی ساخته نشده!!"}
            </p>
          )}
        </CardBody>
      </Card>
      <AppPagination meta={datas?.data?.meta} />
    </section>
  );
};

export default CardContent;
