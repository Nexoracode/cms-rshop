"use client";

import { Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/core/hooks/api/users/useUsers";
import BaseCard from "@/components/ui/BaseCard";
import { LuMapPinHouse, LuUserRoundPen } from "react-icons/lu";
import FormActionButtons from "@/components/common/FormActionButtons";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import EmailInput from "@/components/shared/EmailInput";
import UserAddressModal from "./modals/UserAddressModal";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
        router.push("/admin/store/customers");
      },
    });
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
          <PhoneInput
            value={data.phone}
            onChange={(phone, isValid) => {
              setData((prev: any) => ({
                ...prev,
                phone: phone,
              }));
            }}
            label="شماره تماس"
            placeholder="09XXXXXXXXXX"
            isRequired
          />

          <EmailInput
            value={data.email}
            onChange={(email) => setData((prev: any) => ({ ...prev, email }))}
            label="ایمیل"
            placeholder="example@mail.com"
            isRequired
          />
        </div>

        {/* <ImageBoxUploader
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
        </div>
      </BaseCard>

      <BaseCard
        CardHeaderProps={{
          title: "آدرس های کاربر",
          icon: <LuMapPinHouse />,
          children: <UserAddressModal userId={user?.id}/>,
        }}
        bodyClassName={`grid grid-cols-1 ${
          data?.addresses?.length ? "sm:grid-cols-2" : ""
        } gap-4 px-4 pb-4`}
      >
        {data?.addresses?.map((addr: Address, index: number) => (
          <BaseCard wrapperContents key={index}>
            test
          </BaseCard>
        )) || (
          <div className="w-full flex flex-col items-center gap-4 bg-slate-50 rounded-xl px-4 py-20">
            <LuMapPinHouse className="text-5xl text-gray-600" />
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
