"use client";

import { Card, CardBody } from "@heroui/react";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import BasePagination from "@/components/ui/BasePagination";
import { BiPackage, BiSearchAlt } from "react-icons/bi";
import CardHeader from "./CardHeader";

type EntityCardProps = {
  icon?: any;
  title: string;
  onAdd?: () => void;
  redirect?: string,
  isLoading: boolean;
  datas: any;
  header?: any;
  children: React.ReactNode;
  searchInp?: boolean;
  isExistItems: boolean;
  textBtn?: string,
  childrenClassName?: string
};

const EntityCard: React.FC<EntityCardProps> = ({
  title,
  icon,
  onAdd,
  isLoading,
  datas,
  redirect,
  header,
  children,
  searchInp,
  isExistItems,
  textBtn,
  childrenClassName= ""
}) => {
  return (
    <section className="flex flex-col gap-6">
      {header}
      <Card className="shadow-md">
        <CardBody className="overflow-hidden pb-4">
          <CardHeader icon={icon} title={title} onAdd={onAdd} redirect={redirect} textBtn={textBtn}/>

          {isLoading ? (
            <LoadingApiCall />
          ) : isExistItems ? (
            <div className={`flex flex-col justify-center gap-4 ${childrenClassName}`}>
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
          )}
        </CardBody>
      </Card>
      <BasePagination meta={datas?.data?.meta} />
    </section>
  );
};

export default EntityCard;
