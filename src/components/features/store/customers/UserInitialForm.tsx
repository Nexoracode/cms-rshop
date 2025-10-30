"use client";

import { Checkbox, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import { useUpdateUser } from "@/hooks/api/users/useUsers";
import BaseCard from "@/components/ui/BaseCard";
import { LuMapPinHouse, LuUserRoundPen, LuUserRoundPlus } from "react-icons/lu";
import FormActionButtons from "@/components/common/FormActionButtons";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";

type Address = {
  city: string;
  province: string;
  address_line: string;
  postal_code: string;
  is_primary: boolean;
};

type Props = {
  user: Record<string, any>[];
};

const UserInitialForm = ({ user }: Props) => {
  const {
    first_name,
    last_name,
    phone,
    membership,
    email,
    id,
    is_active,
    is_phone_verified,
    avatar_url,
    address,
  } = user as any;
  const updateUser = useUpdateUser(id);

  const [data, setData] = useState({
    first_name,
    last_name,
    phone,
    email,
    is_active,
    is_phone_verified,
    avatar_url,
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
      avatar_url,
      email,
      first_name,
      is_active,
      is_phone_verified,
      last_name,
      phone,
    } = data;

    const dataToSend = {
      first_name,
      last_name,
      phone,
      email,
      is_active,
      is_phone_verified,
      avatar_url,
      address,
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
          icon: <LuUserRoundPen />,
          showIconInActionSlot: true,
        }}
        wrapperContents
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            labelPlacement="outside"
            label="نام"
            autoFocus
            variant="flat"
            placeholder="نام را وارد کنید"
            value={data.first_name}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, first_name: value }))
            }
          />

          <Input
            labelPlacement="outside"
            variant="flat"
            label="نام خوانوادگی"
            placeholder="نام خانوادگی را وارد کنید"
            value={data.last_name}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, last_name: value }))
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
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

        <ImageBoxUploader
          title="تصویر مشتری"
          defaultImg={avatar_url}
          onFile={() => {}}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Checkbox
            isSelected={data.is_active}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, is_active: value }))
            }
          >
            <span className="text-sm">
              {" "}
              وضعیت حساب {data.is_active ? "فعال" : "غیرفعال"}
            </span>
          </Checkbox>

          <Checkbox
            isSelected={data.is_phone_verified}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, is_phone_verified: value }))
            }
          >
            <span className="text-sm">
              {" "}
              وریفای شماره تلفن {data.is_phone_verified ? "فعال" : "غیرفعال"}
            </span>
          </Checkbox>
        </div>
      </BaseCard>

      <BaseCard
        CardHeaderProps={{
          title: "آدرس های کاربر",
          icon: <LuMapPinHouse />,
          showIconInActionSlot: true,
        }}
        bodyClassName="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-4"
      >
        {data.address.map((addr: Address, index: number) => (
          <BaseCard wrapperContents key={index}>
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
          </BaseCard>
        ))}
      </BaseCard>

      <FormActionButtons
        cancelHref="/admin/store/customers"
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default UserInitialForm;
