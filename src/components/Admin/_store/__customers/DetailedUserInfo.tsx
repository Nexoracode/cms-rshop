"use client";

import { Button, Checkbox, Input, Textarea } from "@heroui/react";
import InfoRow from "@/components/Admin/_orders/helper/InfoRow";
import { ActionType } from "@/types";
import { useState } from "react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { useDeleteUser, useUpdateUser } from "@/hooks/users/useUsers";

type Address = {
  city: string;
  province: string;
  address_line: string;
  postal_code: string;
  is_primary: boolean;
};

type Props = {
  firstName: string;
  lastName: string;
  phone: string;
  membership: string;
  email: string;
  id: number;
  isActive: boolean;
  isPhoneVerified: boolean;
  avatarUrl: string;
  address: Address[];
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
  avatarUrl,
  address,
}: Props) => {
  const [actionType, setActionType] = useState<ActionType>("view");
  const [data, setData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phone || "",
    email: email || "",
    isActive: isActive,
    isPhoneVerified: isPhoneVerified,
    avatarUrl: avatarUrl,
    address: address || [
      {
        city: "",
        province: "",
        address_line: "",
        postal_code: "",
        is_primary: false,
      },
    ],
  });

  //? Hooks
  const deleteUser = useDeleteUser(id);
  const updateUser = useUpdateUser(id);

  const handleUpdate = () => {
    const {
      address,
      avatarUrl,
      email,
      firstName,
      isActive,
      isPhoneVerified,
      lastName,
      phone,
    } = data;

    const dataToSend = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      is_active: isActive,
      is_phone_verified: isPhoneVerified,
      avatar_url: avatarUrl,
      address: address,
    };

    updateUser.mutate(dataToSend, {
      onSuccess: () => {
        setActionType("view");
      },
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/\D/g, "");
    setData((prev) => ({ ...prev, phone: String(val) }));
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4 shadow-[0_0_20px_lightgray] bg-white w-full xs:w-fit p-2 xs:p-4 rounded-2xl">
        <div className="flex items-center bg-slate-100 rounded-xl py-4 justify-around w-full">
          <div className="flex flex-col items-center gap-4 text-gray-700">
            <p className="text-lg hidden sm:flex">
              کاربر {firstName} {lastName}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Button
                variant="flat"
                color={actionType === "view" ? "success" : "danger"}
                size="sm"
                onPress={() =>
                  setActionType((prev) => (prev === "edit" ? "view" : "edit"))
                }
              >
                {actionType === "view" ? "ویرایش" : "x لغو ویرایش"}
              </Button>
              <DoubleClickBtn
                color="danger"
                size="sm"
                onPress={() => {
                  deleteUser.mutate();
                }}
                textBtn="حذف"
                isActiveDoubleClick
              />
            </div>
          </div>
          <img
            src={
              avatarUrl ||
              "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb"
            }
            alt="profile"
            className="w-32 h-32 rounded-xl object-cover"
          />
        </div>
        {actionType !== "edit" ? (
          <div className="w-full xs:w-[350px] sm:w-[400px] border rounded-xl p-2 flex flex-col gap-2 text-left">
            <InfoRow label="شناسه کاربر" value={String(id)} />
            <InfoRow
              label="نام و نام خانوادگی"
              value={`${firstName || "نام"} ${lastName || " | نام خوانوادگی"}`}
              isActiveBg
            />
            <InfoRow label="شماره همراه" value={phone} />
            <InfoRow label="ایمیل" value={email || "example@gmail.com"} isActiveBg/>
            <InfoRow label="تاریخ عضویت" value={membership} />
            <InfoRow label="وضعیت حساب" value={isActive ? "بله" : "خیر"} isActiveBg/>
            <InfoRow
              label="تایید شماره همراه"
              value={isPhoneVerified ? "بله" : "خیر"}
              
            />
            <div className="flex flex-col gap-2 text-right bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">آدرس ها:</p>
              <div className="text-sm text-gray-500 bg-slate-100 p-2 rounded-lg">
                {address.map((addr, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="text-gray-700">آدرس {index + 1}</span>
                    <InfoRow label="استان" value={addr.province || "نامشخص"} />
                    <InfoRow label="شهر" value={addr.city || "نامشخص"} />
                    <InfoRow label="آدرس" value={addr.address_line || "نامشخص"} />
                    <InfoRow label="آدرس پستی" value={addr.postal_code || "نامشخص"} />
                    <InfoRow label="آدرس اصلی" value={addr.is_primary ? "بله" : "خیر"} />
                  </div>
                )) || "ندارد"}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full xs:w-[350px] sm:w-[400px] border rounded-xl p-2 flex flex-col gap-6 text-left">
            <Input
              labelPlacement="outside"
              label="نام"
              autoFocus
              variant="flat"
              placeholder="نام را وارد کنید"
              value={data.firstName}
              onValueChange={(value) =>
                setData((prev) => ({ ...prev, firstName: value }))
              }
            />
            <Input
              labelPlacement="outside"
              variant="flat"
              label="نام خوانوادگی"
              placeholder="نام خانوادگی را وارد کنید"
              value={data.lastName}
              onValueChange={(value) =>
                setData((prev) => ({ ...prev, lastName: value }))
              }
            />
            <Input
              labelPlacement="outside"
              label="شماره تماس"
              style={{ direction: "ltr" }}
              type="tel"
              inputMode="tel"
              variant="flat"
              maxLength={11}
              value={data.phone}
              onChange={handlePhoneChange}
            />
            <Input
              labelPlacement="outside"
              variant="flat"
              placeholder="ایمیل را وارد کنید"
              label="ایمیل"
              type="email"
              value={data.email}
              onValueChange={(value) =>
                setData((prev) => ({ ...prev, email: value }))
              }
            />
            <div className="bg-gray-100 p-2 rounded-xl flex flex-col gap-3">
              <Checkbox
                isSelected={data.isActive}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, isActive: value }))
                }
              >
                <span className="text-sm">
                  {" "}
                  وضعیت حساب {data.isActive ? "فعال" : "غیرفعال"}
                </span>
              </Checkbox>
              <Checkbox
                isSelected={data.isPhoneVerified}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, isPhoneVerified: value }))
                }
              >
                <span className="text-sm">
                  {" "}
                  وریفای شماره تلفن {data.isPhoneVerified ? "فعال" : "غیرفعال"}
                </span>
              </Checkbox>
            </div>
            {data.address.map((addr: Address, index: number) => (
              <div
                key={index}
                className="bg-gray-50 border p-3 rounded-lg flex flex-col gap-3"
              >
                <Input
                  label="استان"
                  value={addr.province}
                  onValueChange={(value) => {
                    const updated = [...data.address];
                    updated[index].province = value;
                    setData((prev) => ({ ...prev, address: updated }));
                  }}
                />
                <Input
                  label="شهر"
                  value={addr.city}
                  onValueChange={(value) => {
                    const updated = [...data.address];
                    updated[index].city = value;
                    setData((prev) => ({ ...prev, address: updated }));
                  }}
                />
                <Input
                  label="کد پستی"
                  value={addr.postal_code}
                  onValueChange={(value) => {
                    const updated = [...data.address];
                    updated[index].postal_code = value;
                    setData((prev) => ({ ...prev, address: updated }));
                  }}
                />
                <Textarea
                  label="آدرس کامل"
                  value={addr.address_line}
                  onValueChange={(value) => {
                    const updated = [...data.address];
                    updated[index].address_line = value;
                    setData((prev) => ({ ...prev, address: updated }));
                  }}
                />
                <Checkbox
                  isSelected={addr.is_primary}
                  onValueChange={(value) => {
                    const updated = [...data.address];
                    updated[index].is_primary = value;
                    setData((prev) => ({ ...prev, address: updated }));
                  }}
                >
                  آدرس اصلی
                </Checkbox>
              </div>
            ))}
            <Button
              className="w-full"
              variant="flat"
              color={"success"}
              size="sm"
              onPress={handleUpdate}
              isDisabled={
                !data.firstName.length ||
                !data.lastName.length ||
                !data.email ||
                data.phone.length < 11 ||
                data.address.some(
                  (addr) =>
                    !addr.city.trim() ||
                    !addr.province.trim() ||
                    !addr.address_line.trim() ||
                    !addr.postal_code.trim()
                )
              }
            >
              ویرایش
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedUserInfo;
