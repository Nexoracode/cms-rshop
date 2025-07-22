"use client";

import { Button, Card, CardBody } from "@heroui/react";
import React from "react";
import { TbUserHexagon } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { SiSimplelogin } from "react-icons/si";
import CustomerBoxInfo from "./CustomerBoxInfo";
import { MdOutlineMailOutline } from "react-icons/md";
import InfoRow from "@/components/Admin/_orders/helper/InfoRow";

type Props = {
  firstName: string;
  lastName: string;
  phone: string;
  membership: string;
  email: string;
  onShowDetail?: () => void;
  isShowDetail?: boolean;
  id?: number;
  isActive?: boolean;
  isPhoneVerified?: boolean;
  avatar_url?: string;
};

const CustomerBoxDetail: React.FC<Props> = ({
  firstName,
  lastName,
  phone,
  membership,
  email,
  onShowDetail,
  isShowDetail = false,
  id,
  isActive,
  isPhoneVerified,
  avatar_url,
}) => {
  return !isShowDetail ? (
    <Card className="w-full border shadow-md">
      <CardBody>
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

        <div className="flex flex-wrap gap-2 justify-between items-center text-sm text-gray-700">
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
  ) : (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4 shadow-[0_0_20px_lightgray] bg-white w-full xs:w-fit p-2 xs:p-4 rounded-2xl">
        <div className="flex items-center bg-slate-100 rounded-xl py-4 justify-around w-full">
          <p className="text-xl text-gray-700 hidden sm:flex">عکس پروفایل</p>
          <img
            src={
              avatar_url ||
              "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb"
            }
            alt="profile"
            className="w-32 h-32 rounded-xl object-cover"
          />
        </div>
        <div className="w-full xs:w-[350px] sm:w-[400px] border rounded-xl p-2 flex flex-col gap-2 text-left">
          <InfoRow label="شناسه کاربر" value={String(id)} isActiveBg />
          <InfoRow
            label="نام و نام خانوادگی"
            value={`${firstName} ${lastName}`}
          />
          <InfoRow label="شماره همراه" value={phone} isActiveBg />
          <InfoRow label="ایمیل" value={email} />
          <InfoRow label="تاریخ عضویت" value={membership} isActiveBg />
          <InfoRow label="وضعیت حساب" value={isActive ? "بله" : "خیر"} />
          <InfoRow
            label="وریفای"
            value={isPhoneVerified ? "بله" : "خیر"}
            isActiveBg
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerBoxDetail;
