"use client";

import { Button, Card, CardBody } from "@heroui/react";
import React from "react";
import { TbUserHexagon } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { SiSimplelogin } from "react-icons/si";
import CustomerBoxInfo from "./CustomerBoxInfo";
import { MdOutlineMailOutline } from "react-icons/md";

type Props = {
  firstName: string;
  lastName: string;
  phone: string;
  membership: string;
  email: string;
  onShowDetail?: () => void;
  cardHeader?: React.ReactNode;
};

const CustomerBoxDetail: React.FC<Props> = ({
  firstName,
  lastName,
  phone,
  membership,
  email,
  onShowDetail,
  cardHeader,
}) => {
  return (
    <Card className="w-full border shadow-md">
      {cardHeader}
      <CardBody>
        {!cardHeader ? (
          <div className="w-full flex flex-col xs:flex-row items-center justify-between mb-4">
            <p className="hidden xs:flex">اطلاعات کلی کاربر</p>
            <Button
              onPress={onShowDetail}
              className="text-sm w-full xs:w-fit"
              variant="flat"
              color="primary"
            >
              مشاهده جزئیات
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-wrap gap-4 justify-between items-center text-sm text-gray-700">
          <CustomerBoxInfo
            title={`${firstName} ${lastName}`}
            subTitle="نام و نام خوانوداگی"
            icon={<TbUserHexagon className="text-3xl ml-2" />}
          />
          <CustomerBoxInfo
            title={phone}
            subTitle="شماره همراه"
            icon={<FiSmartphone className="text-3xl ml-2" />}
          />
          <CustomerBoxInfo
            title={email}
            subTitle="ایمیل (رایانامه)"
            icon={<MdOutlineMailOutline className="text-3xl ml-2" />}
          />
          <CustomerBoxInfo
            title={membership}
            subTitle="تاریخ عضویت"
            icon={<SiSimplelogin className="text-3xl ml-2" />}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomerBoxDetail;
