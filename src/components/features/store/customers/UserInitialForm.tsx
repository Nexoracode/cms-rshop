"use client";

import { Checkbox, Divider } from "@heroui/react";
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
import UserAddressCard from "./UserAddress/UserAddressCard";
import { UserAddress } from "./customer.types";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";

type Props = {
  user?: Record<string, any>;
};

const UserInitialForm = ({ user }: Props) => {
  const router = useRouter();
  const updateUser = useUpdateUser();

  const [data, setData] = useState<any>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    is_active: false,
    is_phone_verified: false,
    avatar_url: "",
    addresses: [],
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
      addresses: user?.addresses?.length ? user.addresses : null,
    });
  }, [user]);

  const handleUpdate = () => {
    const { email, first_name, is_active, last_name, phone } = data;

    const dataToSend = {
      first_name,
      last_name,
      phone,
      email,
      is_active,
    };

    updateUser.mutate(
      { data: dataToSend, id: user?.id },
      {
        onSuccess: (res) => {
          res.ok && router.push("/admin/store/customers");
        },
      }
    );
  };

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات تکمیلی کاربر",
        icon: <LuUserRoundPen />,
        showIconInActionSlot: true,
      }}
      wrapperContents
    >
      <div className="pointer-events-none opacity-75 select-none !cursor-auto">
        <ImageBoxUploader
          title="تصویر مشتری"
          defaultImg={data.avatar_url}
          onFile={() => {}}
        />
      </div>

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
          isActiveError={true}
          isRequired
        />
      </div>

      <ToggleSection
        title={` وضعیت حساب ${data.is_active ? "فعال" : "غیرفعال"}`}
        initialMode={data.is_active}
        onChange={(val) =>
          setData((prev: any) => ({ ...prev, is_active: val }))
        }
      />

      <div className="-mb-4">
        {data?.addresses ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p>آدرس های کاربر</p>
              <UserAddressModal userId={user?.id} />
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`grid grid-cols-1 ${
            data?.addresses?.length ? "sm:grid-cols-2" : ""
          } gap-4 pb-4`}
        >
          {data?.addresses?.map((addr: UserAddress, index: number) => (
            <UserAddressCard key={index} address={addr} userId={user?.id} />
          )) || (
            <div className="w-full flex flex-col items-center gap-4  rounded-xl border-3 border-dashed px-4 py-6">
              <LuMapPinHouse className="text-5xl text-gray-600" />
              <p> آدرسی از سمت کاربر هنوز ثبت نشده!!</p>
              <UserAddressModal userId={user?.id} />
            </div>
          )}
        </div>
      </div>

      <FormActionButtons
        cancelHref="/admin/store/customers"
        onSubmit={handleUpdate}
      />
    </BaseCard>
  );
};

export default UserInitialForm;
