"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import { Input } from "@heroui/react";
import { BsShop } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { TiSocialLinkedin } from "react-icons/ti";
import { validateInfos } from "./infos-validation";
import { useInfosCreate } from "@/core/hooks/api/useSeting";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialInfos = {};

type InfosFormProps = {
  isLoading: boolean;
  data: any
};

const InfosForm: React.FC<InfosFormProps> = ({ isLoading, data }) => {
  const router = useRouter();
  const { mutate: createInfos } = useInfosCreate();

  console.log("data =>", data);

  const {
    form,
    errors,
    handleFieldChange,
    setForm,
    handleMultipleFieldsChange,
    submit,
  } = useForm(initialInfos, {
    onValidate: validateInfos,
    runValidationOnChange: true,
  });

  useEffect(() => {
    console.log(data);
    data && setForm(data);
  }, [data]);

  const handleSubmit = submit(async (changed) => {
    createInfos(changed, {
      onSuccess: (res) => {
        if (res.ok) {
          router.push("/admin/store/infos");
        }
      },
    });
  });

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات کلی فروشگاه",
        icon: <BsShop className="w-6 h-6" />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="نام و نام خوانوادگی مدیر"
          placeholder="وارد کنید..."
          value={""}
          onChange={() => {}}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.full_name}
        />
        <Input
          style={{ direction: "ltr" }}
          labelPlacement="outside"
          label="شماره تلفن مدیر"
          placeholder="09XX-XXX-XXXX"
          type="tel"
          inputMode="tel"
          variant="flat"
          isRequired
          maxLength={11}
          value={""}
          onChange={() => {}}
          errorMessage={errors.phone}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="شماره کارت فروشگاه"
          placeholder="0000_0000_0000_0000"
          maxLength={11}
          value={""}
          inputAlign="left"
          onChange={() => {}}
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.card_number}
        />
        <TextInput
          label="شماره شبا فروشگاه"
          placeholder="0000_0000_0000_0000_0000_0000"
          maxLength={30}
          value={""}
          inputAlign="left"
          onChange={() => {}}
          endContent="IR"
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.sheba_number}
        />
      </div>
      <div className="flex items-center cursor-auto text-gray-700 gap-6 justify-between border-t border-b py-3 my-2">
        <p>شبکه های اجتماعی فروشگاه</p>
        <TiSocialLinkedin className="text-2xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={
            <div className="flex items-center gap-2">
              <LuInstagram className="text-xl text-pink-500" />
              <span>اینستاگرام</span>
            </div>
          }
          labelPlacement="outside"
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://instagram.com
              </span>
            </div>
          }
        />

        <Input
          label={
            <div className="flex items-center gap-2">
              <FaTelegram className="text-xl text-sky-500" />
              <span>تلگرام</span>
            </div>
          }
          labelPlacement="outside"
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">https://t.me</span>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={
            <div className="flex items-center gap-2">
              <img src="/images/eitaa.png" className="w-5" alt="eitaa" />
              <span>ایتا</span>
            </div>
          }
          labelPlacement="outside"
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://eitaa.com
              </span>
            </div>
          }
        />

        <Input
          label={
            <div className="flex items-center gap-2">
              <img src="/images/rubika.png" className="w-5" alt="rubika" />
              <span>روبیکا</span>
            </div>
          }
          labelPlacement="outside"
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://rubika.ir
              </span>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={
            <div className="flex items-center gap-2">
              <img src="/images/whatsapp.png" className="w-5" alt="whatsap" />
              <span>واتساپ</span>
            </div>
          }
          labelPlacement="outside"
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://whatsapp.com
              </span>
            </div>
          }
        />

        <Input
          label={
            <div className="flex items-center gap-2">
              <img src="/images/balle.jpg" className="w-5" alt="balle" />
              <span>بله</span>
            </div>
          }
          labelPlacement="outside"
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">https://ble.ir</span>
            </div>
          }
        />
      </div>

      <FormActionButtons
        cancelHref="/admin/store"
        onSubmit={handleSubmit}
        submitText="ثبت تغیرات"
      />
    </BaseCard>
  );
};

export default InfosForm;
