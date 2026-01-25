"use client";

import { useEffect } from "react";
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
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { useForm } from "@/core/hooks/common/form/useForm";
import { userInitialValidate } from "./user-initial-validate";

const initialUserForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  is_active: false,
  is_phone_verified: false,
  avatar_url: "",
  addresses: [],
};

type Props = {
  user?: Record<string, any>;
  isLoading: boolean;
};

const UserInitialForm = ({ user, isLoading }: Props) => {
  const router = useRouter();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    form,
    errors,
    handleFieldChange,
    setForm,
    submit,
  } = useForm(initialUserForm, {
    onValidate: userInitialValidate,
    runValidationOnChange: true,
  });

  useEffect(() => {
    if (!user) return;

    setForm({
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

  const handleSubmit = submit(async (changed) => {
    const { email, first_name, is_active, last_name, phone } = form;

    const dataToSend = {
      first_name,
      last_name,
      phone,
      ...(email ? { email } : {}),
      is_active,
    };
    updateUser(
      { data: dataToSend, id: user?.id },
      {
        onSuccess: (res) => {
          res.ok && router.push("/admin/products");
        },
      }
    );
  });

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات تکمیلی کاربر",
        icon: <LuUserRoundPen />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      {/* <div className="pointer-events-none opacity-75 select-none !cursor-auto">
        <ImageBoxUploader
          title="تصویر مشتری"
          defaultImg={""}
          onFile={() => {}}
        />
      </div> */}

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <TextInput
          label="نام"
          placeholder="نام را وارد کنید"
          value={form.first_name}
          onChange={(val) => handleFieldChange("first_name", val)}
          allowEnglishOnly={false}
          inputAlign="right"
          isRequired
          errorMessage={errors.first_name}
        />

        <TextInput
          label="نام خانوادگی"
          placeholder="نام خانوادگی را وارد کنید"
          value={form.last_name}
          onChange={(val) => handleFieldChange("last_name", val)}
          allowEnglishOnly={false}
          inputAlign="right"
          isRequired
          errorMessage={errors.last_name}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <PhoneInput
          value={form.phone}
          onChange={(phone) => {
            handleFieldChange("phone", phone);
          }}
          label="شماره تماس"
          placeholder="09XXXXXXXXXX"
          isRequired
        />

        <EmailInput
          value={form.email}
          onChange={(email) => handleFieldChange("email", email)}
          isActiveError={true}
        />
      </div>

      <ToggleSection
        title={` وضعیت حساب ${form.is_active ? "فعال" : "غیرفعال"}`}
        initialMode={form.is_active}
        onChange={(val) => handleFieldChange("is_active", val)}
      />

      <div className="-mb-4">
        {form?.addresses ? (
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
            form?.addresses?.length ? "sm:grid-cols-2" : ""
          } gap-4 pb-4`}
        >
          {form?.addresses?.map((addr: UserAddress, index: number) => (
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
        onSubmit={handleSubmit}
        isLoading={isLoading || isPending}
      />
    </BaseCard>
  );
};

export default UserInitialForm;
