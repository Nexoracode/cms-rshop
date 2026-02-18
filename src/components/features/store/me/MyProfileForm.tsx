"use client";

import { useForm } from "@/core/hooks/common/form/useForm";
import { myProfileValidation } from "./my-profile-validate";
import { useEffect } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import EmailInput from "@/components/shared/EmailInput";
import FormActionButtons from "@/components/common/FormActionButtons";
import { FaCheckCircle } from "react-icons/fa";
import { formatDate } from "@/core/utils/date";
import UserBoxUploader from "@/components/media/UserBoxUploader";
import BaseCard from "@/components/ui/BaseCard";
import { GrUserAdmin } from "react-icons/gr";
import IconBadge from "@/components/common/IconBadge";
import { rolePersian } from "@/core/types/enum-fa";
import { Role } from "@/core/types";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { Divider } from "@heroui/react";

type MyProfileFormProps = {
  info: any;
  isLoading: boolean;
};

const initialProfileForm = {
  avatar_url: "",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
};

const MyProfileForm: React.FC<MyProfileFormProps> = ({ info, isLoading }) => {
  console.log("admin =>", info);

  const {
    form,
    errors,
    handleFieldChange,
    setForm,
    handleMultipleFieldsChange,
    submit,
    getChangedFields,
  } = useForm(initialProfileForm, {
    onValidate: myProfileValidation,
    runValidationOnChange: true,
  });

  useEffect(() => {
    info && setForm(info);
  }, [info]);

  const handleSubmit = submit(async (changed) => {});

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات من",
        icon: <GrUserAdmin className="text-2xl" />,
        showIconInActionSlot: true,
      }}
      isLoading={isLoading}
      bodyClassName="!cursor-default flex flex-col lg:flex-row gap-6 px-4 pb-4"
    >
      {/* ستون اصلی فرم */}
      <div className="w-4/6 flex-1 flex flex-col gap-6 pt-5">
        <div className="flex items-center gap-2.5">
          <UserBoxUploader onFile={(file) => {}} />
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <IconBadge
                icon={HiOutlineLightningBolt}
                circleClassName="bg-sky-100 !w-6 !h-6"
                iconClassName="text-sky-600 -top-[43px] -left-[6px] w-6"
              />
              <p>{info?.role?.length ? rolePersian[info.role as Role] : ""}</p>
            </div>
            <div>
              <p className="text-nowrap text-gray-600 text-[13px]">
                فروشگاه آرشاپ
              </p>
            </div>
          </div>
        </div>

        {/* Editable fields */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <TextInput
            label=""
            placeholder="نام را وارد کنید"
            value={form.first_name || ""}
            onChange={(v) => handleFieldChange("first_name", v)}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.first_name}
          />
          <TextInput
            label=""
            placeholder="نام خانوادگی را وارد کنید"
            value={form.last_name || ""}
            onChange={(v) => handleFieldChange("last_name", v)}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.last_name}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <PhoneInput
            label=""
            placeholder="09XXXXXXXXXX"
            value={form.phone || ""}
            onChange={(v) => handleFieldChange("phone", v)}
            isRequired
          />
          <EmailInput
            label=""
            value={form.email || ""}
            onChange={(v) => handleFieldChange("email", v)}
            isActiveError={true}
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="-ml-4">
            <FormActionButtons onSubmit={handleSubmit} />
          </div>
        </div>
        <div className="px-4">
          <Divider />
        </div>
        <div>
            <div>
                <p>آقای مداحی باید ادرس های کامل ادمین و کلا کاربر رو که با هر نقشی میخواد باشه برام بفرستین تا بتونه این جا ادرس هاش رو ببینه و در صورت لزم اضافه و حذف و... رو انجام بده</p>
            </div>
            <div className="text-red-500">
                <p> برای سمت ادمین، نیازی نیست آدرس رو نمایش بدی</p>
            </div>
        </div>
      </div>

      {/* ستون read-only و permissions */}
      <div className="w-full lg:w-2/6 border-r pr-6 flex flex-col justify-between gap-5 pt-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-gray-800">شناسه کاربری</p>
            <p className="text-[13px] text-gray-600">#{info?.id}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[13px] text-gray-800">عضویت</p>
            <p className="text-[13px] text-gray-600">
              {info?.created_at ? formatDate(info?.created_at) : "-"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[13px] text-gray-800">حساب فعال</p>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] text-gray-800">مجوزها</p>
          <ul className="space-y-1.5 bg-green-50 rounded-md p-3">
            {info?.permissions?.map((perm: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-gray-600">
                <FaCheckCircle className="text-green-500" />
                <span className="text-[13px] truncate">{perm}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BaseCard>
  );
};

export default MyProfileForm;
