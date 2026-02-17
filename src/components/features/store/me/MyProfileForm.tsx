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

type MyProfileFormProps = {
  info: any;
};

const initialProfileForm = {
  avatar_url: "",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
};

const MyProfileForm: React.FC<MyProfileFormProps> = ({ info }) => {
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
    <div className="flex flex-col lg:flex-row gap-4">
      {/* ستون اصلی فرم */}
      <div className="w-4/6 flex-1 flex flex-col gap-6">
        {/* Editable fields */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <TextInput
            label="نام"
            placeholder="نام را وارد کنید"
            value={form.first_name || ""}
            onChange={(v) => handleFieldChange("first_name", v)}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.first_name}
          />
          <TextInput
            label="نام خانوادگی"
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
            label="شماره تماس"
            placeholder="09XXXXXXXXXX"
            value={form.phone || ""}
            onChange={(v) => handleFieldChange("phone", v)}
            isRequired
          />
          <EmailInput
            label="ایمیل"
            value={form.email || ""}
            onChange={(v) => handleFieldChange("email", v)}
            isActiveError={true}
          />
        </div>

        <div className="flex items-center justify-end">
          <FormActionButtons onSubmit={handleSubmit} />
        </div>
      </div>

      {/* ستون read-only و permissions */}
      <div className="w-full lg:w-2/6 border-r pr-4 pl-2 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px]">شناسه کاربری</p>
          <p className="text-[13px] text-gray-600">#{info?.id}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[13px]">عضویت</p>
          <p className="text-[13px] text-gray-600">
            {formatDate(info?.created_at)}
          </p>
        </div>
       
        <div className="flex items-center justify-between">
          <p className="text-[13px]">حساب فعال</p>
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
        </div>

        <ul className="space-y-1.5 bg-green-50 rounded-md p-1.5">
          {info?.permissions?.map((perm: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2 text-gray-600">
              <FaCheckCircle className="text-green-500" />
              <span className="text-[13px] truncate">{perm}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProfileForm;
