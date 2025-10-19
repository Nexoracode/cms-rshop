"use client";

import { Card, CardBody } from "@heroui/react";
import LoadingApiCall from "../Helper/LoadingApiCall";
import AppPagination from "../Helper/AppPagination";
import HeaderActionCard from "../Helper/HeaderActionCard";
import { BiPackage, BiSearchAlt } from "react-icons/bi";

type CardContentProps = {
  icon?: any;
  title: string;
  onAdd: () => void;
  isLoading: boolean;
  datas: any;
  header?: any;
  children: React.ReactNode;
  searchInp?: boolean;
  isExistItems: boolean;
  textBtn?: string
};

const CardContent: React.FC<CardContentProps> = ({
  title,
  icon,
  onAdd,
  isLoading,
  datas,
  header,
  children,
  searchInp,
  isExistItems,
  textBtn
}) => {
  return (
    <section className="flex flex-col gap-6">
      {header}
      <Card className="shadow-md">
        <CardBody className="overflow-hidden pb-4">
          <HeaderActionCard icon={icon} title={title} onAdd={onAdd} textBtn={textBtn}/>

          {isLoading ? (
            <LoadingApiCall />
          ) : isExistItems ? (
            children
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
          )}
        </CardBody>
      </Card>
      <AppPagination meta={datas?.data?.meta} />
    </section>
  );
};

export default CardContent;
