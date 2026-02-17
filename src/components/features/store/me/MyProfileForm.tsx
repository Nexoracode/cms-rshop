"use client";

import { useForm } from "@/core/hooks/common/form/useForm";
import { myProfileValidation } from "./my-profile-validate";
import { useEffect } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import EmailInput from "@/components/shared/EmailInput";
import FormActionButtons from "@/components/common/FormActionButtons";

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
    <div className="flex gap-6">
      <div className="w-5/6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <TextInput
            label=""
            placeholder="نام را وارد کنید"
            value={form.first_name}
            onChange={(first_name) => {
              handleFieldChange("first_name", first_name);
            }}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.first_name}
          />
          <TextInput
            label=""
            placeholder="نام خوانوادگی را وارد کنید"
            value={form.last_name}
            onChange={(last_name) => {
              handleFieldChange("last_name", last_name);
            }}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.last_name}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <PhoneInput
            value={form.phone}
            onChange={(phone) => {
              handleFieldChange("phone", phone);
            }}
            label=""
            placeholder="09XXXXXXXXXX"
            isRequired
          />

          <EmailInput
            value={form.email}
            onChange={(email) => handleFieldChange("email", email)}
            isActiveError={true}
            label=""
          />
        </div>
        <div className="flex items-center justify-end">
          <div className="!-ml-4">
            <FormActionButtons onSubmit={() => {}} />
          </div>
        </div>
      </div>
      <div className="w-2/6 border-r pr-6">
        <p>text</p>
      </div>
    </div>
  );
};

export default MyProfileForm;
