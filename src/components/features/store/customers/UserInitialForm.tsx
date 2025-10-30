"use client";

import { Button, Checkbox, Divider, Input, Textarea } from "@heroui/react";
import InfoRow from "@/components/features/orders/helper/InfoRow";
import { useState } from "react";
import { useUpdateUser } from "@/hooks/api/users/useUsers";
import BaseCard from "@/components/ui/BaseCard";
import { FiMapPin, FiUser } from "react-icons/fi";

type Address = {
  city: string;
  province: string;
  address_line: string;
  postal_code: string;
  is_primary: boolean;
};

type Props = {
  user: Record<string, any>[]
};

const UserInitialForm = ({
  user
}: Props) => {

  const { firstName, lastName, phone, membership, email, id, isActive, isPhoneVerified, avatarUrl, address } = user as any;
  const updateUser = useUpdateUser(id);

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
        // action
      },
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/\D/g, "");
    setData((prev) => ({ ...prev, phone: String(val) }));
  };

  return (
    <>
      <BaseCard
        CardHeaderProps={{
          title: "اطلاعات تکمیلی کاربر",
          icon: <FiUser />,
          showIconInActionSlot: true,
        }}
        wrapperContents
      >
        <img
          src={avatarUrl}
          alt="profile"
          className="w-32 h-32 rounded-xl object-cover"
        />

        <div className="flex items-center gap-4">
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
        </div>

        <div className="flex items-center gap-4">
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
        </div>

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
            وریفای شماره تلفن{" "}
            {data.isPhoneVerified ? "فعال" : "غیرفعال"}
          </span>
        </Checkbox>

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
      </BaseCard>

      <BaseCard
        CardHeaderProps={{
          title: "آدرس هاس کاربر",
          icon: <FiMapPin />,
          showIconInActionSlot: true,
        }}
        bodyClassName="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-4"
      >
        {data.address.map((addr: Address, index: number) => (
          <>
            <div key={index} className="shadow-[0_0_7px_lightgray] rounded-xl p-4 flex flex-col gap-6">
              <Input
                label="استان"
                value={addr.province}
                size="md"
                labelPlacement="outside"
                placeholder="استان را وارد کنید"
                onValueChange={(value) => {
                  const updated = [...data.address];
                  updated[index].province = value;
                  setData((prev) => ({ ...prev, address: updated }));
                }}
              />
              <Input
                label="شهر"
                value={addr.city}
                labelPlacement="outside"
                placeholder="شهر را وارد کنید"
                onValueChange={(value) => {
                  const updated = [...data.address];
                  updated[index].city = value;
                  setData((prev) => ({ ...prev, address: updated }));
                }}
              />
              <Input
                label="کد پستی"
                labelPlacement="outside"
                placeholder="کدپستی را وارد کنید"
                value={addr.postal_code}
                onValueChange={(value) => {
                  const updated = [...data.address];
                  updated[index].postal_code = value;
                  setData((prev) => ({ ...prev, address: updated }));
                }}
              />
              <Textarea
                label="آدرس کامل"
                labelPlacement="outside"
                placeholder="آدرس کامل را وارد کنید"
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
                <span className="text-sm"> آدرس اصلی</span>
              </Checkbox>
            </div>
            <div key={index + 1} className="shadow-[0_0_7px_lightgray] rounded-xl p-4 flex flex-col gap-6">
              <Input
                label="استان"
                value={addr.province}
                size="md"
                labelPlacement="outside"
                placeholder="استان را وارد کنید"
                onValueChange={(value) => {
                  const updated = [...data.address];
                  updated[index].province = value;
                  setData((prev) => ({ ...prev, address: updated }));
                }}
              />
              <Input
                label="شهر"
                value={addr.city}
                labelPlacement="outside"
                placeholder="شهر را وارد کنید"
                onValueChange={(value) => {
                  const updated = [...data.address];
                  updated[index].city = value;
                  setData((prev) => ({ ...prev, address: updated }));
                }}
              />
              <Input
                label="کد پستی"
                labelPlacement="outside"
                placeholder="کدپستی را وارد کنید"
                value={addr.postal_code}
                onValueChange={(value) => {
                  const updated = [...data.address];
                  updated[index].postal_code = value;
                  setData((prev) => ({ ...prev, address: updated }));
                }}
              />
              <Textarea
                label="آدرس کامل"
                labelPlacement="outside"
                placeholder="آدرس کامل را وارد کنید"
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
                <span className="text-sm"> آدرس اصلی</span>
              </Checkbox>
            </div>
          </>
        ))}
      </BaseCard>
    </>
  );
};

export default UserInitialForm;
