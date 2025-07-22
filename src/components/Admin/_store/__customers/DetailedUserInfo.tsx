"use client";

import { Button } from "@heroui/react";
import InfoRow from "@/components/Admin/_orders/helper/InfoRow";

type Props = {
  firstName: string;
  lastName: string;
  phone: string;
  membership: string;
  email: string;
  id?: number;
  isActive?: boolean;
  isPhoneVerified?: boolean;
  avatar_url?: string;
};

const DetailedUserInfo = ({
  firstName,
  lastName,
  phone,
  membership,
  email,
  id,
  isActive,
  isPhoneVerified,
  avatar_url,
}: Props) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4 shadow-[0_0_20px_lightgray] bg-white w-full xs:w-fit p-2 xs:p-4 rounded-2xl">
        <div className="flex items-center bg-slate-100 rounded-xl py-4 justify-around w-full">
          <div className="flex flex-col items-center gap-2 text-gray-700">
            <p className="text-xl hidden sm:flex">عکس پروفایل</p>
            <Button variant="flat" color="success" size="sm">
              بروز رسانی کاربر
            </Button>
          </div>
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
            value={`${firstName || "نام"} ${lastName || " | نام خوانوادگی"}`}
          />
          <InfoRow label="شماره همراه" value={phone} isActiveBg />
          <InfoRow label="ایمیل" value={email || "example@gmail.com"} />
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

export default DetailedUserInfo;
