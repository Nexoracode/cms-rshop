"use client";

import { Checkbox, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/api/users/useUsers";
import BaseCard from "@/components/ui/BaseCard";
import { LuMapPinHouse, LuUserRoundPen } from "react-icons/lu";
import FormActionButtons from "@/components/common/FormActionButtons";
import TextInput from "@/components/ui/inputs/TextInput";
import ProvinceCitySelector from "@/components/shared/ProvinceCitySelector";

type Address = {
  city: string;
  province: string;
  address_line: string;
  postal_code: string;
  is_primary: boolean;
};

type Props = {
  user?: Record<string, any>;
};

const UserInitialForm = ({ user }: Props) => {
  const updateUser = useUpdateUser(user?.id);

  // مقدار اولیه‌ی امن برای رندر اولیه
  const [data, setData] = useState<any>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    is_active: false,
    is_phone_verified: false,
    avatar_url: "",
    addresses: [
      {
        city: "",
        province: "",
        address_line: "",
        postal_code: "",
        is_primary: false,
      },
    ],
  });

  useEffect(() => {
    if (!user) return;

    setData({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
      is_active: !!user.is_active,
      is_phone_verified: !!user.is_phone_verified,
      avatar_url: user.avatar_url ?? "",
      address:
        user.address && user.address.length
          ? user.address
          : [
              {
                city: "",
                province: "",
                address_line: "",
                postal_code: "",
                is_primary: false,
              },
            ],
    });
  }, [user]);

  const handleUpdate = () => {
    const {
      addresses,
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
      addresses,
    };
    console.log(dataToSend);

    updateUser.mutate(dataToSend, {
      onSuccess: () => {
        // success logic
      },
    });
  };

  const handlePhoneChange = (val: string) => {
    const clean = val.replace(/\D/g, "");
    setData((prev: any) => ({ ...prev, phone: clean }));
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
          <TextInput
            label="نام"
            placeholder="نام را وارد کنید"
            value={data.first_name}
            onChange={(val) =>
              setData((prev: any) => ({ ...prev, first_name: val }))
            }
            allowEnglishOnly={false}
            inputAlign="right"
          />

          <TextInput
            label="نام خانوادگی"
            placeholder="نام خانوادگی را وارد کنید"
            value={data.last_name}
            onChange={(val) =>
              setData((prev: any) => ({ ...prev, last_name: val }))
            }
            allowEnglishOnly={false}
            inputAlign="right"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <TextInput
            label="شماره تماس"
            placeholder="شماره تماس را وارد کنید"
            type="tel"
            maxLength={11}
            inputAlign="left"
            value={data.phone}
            onChange={handlePhoneChange}
          />

          <TextInput
            label="ایمیل"
            placeholder="ایمیل را وارد کنید"
            type="email"
            value={data.email}
            onChange={(val) =>
              setData((prev: any) => ({ ...prev, email: val }))
            }
            allowSpecialChars
          />
        </div>

        {/*  <ImageBoxUploader
          title="تصویر مشتری"
          defaultImg={data.avatar_url}
          onFile={() => {}}
        /> */}

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Checkbox
            isSelected={data.is_active}
            onValueChange={(value) =>
              setData((prev: any) => ({ ...prev, is_active: value }))
            }
          >
            <span className="text-sm">
              وضعیت حساب {data.is_active ? "فعال" : "غیرفعال"}
            </span>
          </Checkbox>

          <Checkbox
            isSelected={data.is_phone_verified}
            onValueChange={(value) =>
              setData((prev: any) => ({ ...prev, is_phone_verified: value }))
            }
          >
            <span className="text-sm">
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
        {data?.addresses?.map((addr: Address, index: number) => (
          <BaseCard wrapperContents key={index}>
            <ProvinceCitySelector
              provinceId={addr.province}
              cityId={addr.city}
              onChange={({ province, city }) => {
                const updated = [...data.addresses];
                updated[index].province = province;
                updated[index].city = city;
                setData((prev: any) => ({ ...prev, address: updated }));
              }}
            />

            <TextInput
              label="کد پستی"
              placeholder="1Erg5hosd4"
              value={addr.postal_code}
              onChange={(val) => {
                const updated = [...data.addresses];
                updated[index].postal_code = val;
                setData((prev: any) => ({ ...prev, address: updated }));
              }}
            />

            <Textarea
              label="آدرس کامل"
              labelPlacement="outside"
              placeholder="آدرس کامل را وارد کنید"
              value={addr.address_line}
              onValueChange={(value) => {
                const updated = [...data.addresses];
                updated[index].address_line = value;
                setData((prev: any) => ({ ...prev, address: updated }));
              }}
            />

            <Checkbox
              isSelected={addr.is_primary}
              onValueChange={(value) => {
                const updated = [...data.addresses];
                updated[index].is_primary = value;
                setData((prev: any) => ({ ...prev, address: updated }));
              }}
            >
              <span className="text-sm">آدرس اصلی</span>
            </Checkbox>
          </BaseCard>
        )) || (
          <div className="w-full flex flex-col items-center gap-2 bg-slate-50 rounded-xl p-4">
            <LuMapPinHouse className="text-5xl text-gray-600 animate-bounce" />
            آدرسی از سمت کاربر هنوز ثبت نشده!!
          </div>
        )}
      </BaseCard>

      <FormActionButtons
        cancelHref="/admin/store/customers"
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default UserInitialForm;
