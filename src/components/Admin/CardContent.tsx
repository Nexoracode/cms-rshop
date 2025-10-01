"use client";

import { Card, CardBody } from "@heroui/react";
import LoadingApiCall from "../Helper/LoadingApiCall";
import AppPagination from "../Helper/AppPagination";
import HeaderActionCard from "../Helper/HeaderActionCard";

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
  isExistItems,
}) => {
  return (
    <section className="flex flex-col gap-6">
      {header}
      <Card>
        <CardBody className="overflow-hidden pb-4">
          <HeaderActionCard
            icon={icon}
            title={`افزودن ${keyTitle} جدید`}
            keyTitle={title}
            onAdd={onAdd}
          />

          {isLoading ? (
            <LoadingApiCall />
          ) : isExistItems ? (
            children
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
