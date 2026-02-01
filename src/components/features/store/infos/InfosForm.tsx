"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import { BsShop } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { TiSocialLinkedin } from "react-icons/ti";
import { validateInfos } from "./infos-validation";
import { useInfosCreate } from "@/core/hooks/api/useSeting";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialInfos = [
  {
    key: "shop_card_number",
    value: "",
    category: "payment",
  },
  {
    key: "shop_card_holder",
    value: "",
    category: "payment",
  },
  {
    key: "shop_bank_name",
    value: "",
    category: "payment",
  },
  {
    key: "shop_iban",
    value: "",
    category: "payment",
  },
  /* Soicial */
  {
    key: "social_instagram",
    value: "",
    category: "social",
  },
  {
    key: "social_telegram",
    value: "",
    category: "social",
  },
  {
    key: "social_eitaa",
    value: "",
    category: "social",
  },
  {
    key: "social_rubika",
    value: "",
    category: "social",
  },
  {
    key: "social_whatsapp",
    value: "",
    category: "social",
  },
  {
    key: "social_bale",
    value: "",
    category: "social",
  },
];

type InfosFormProps = {
  isLoading: boolean;
  data: any;
};

const InfosForm: React.FC<InfosFormProps> = ({ isLoading, data }) => {
  const router = useRouter();
  const { mutate: createInfos } = useInfosCreate();

  const { form, errors, setForm, submit } = useForm(initialInfos, {
    onValidate: validateInfos,
    runValidationOnChange: true,
  });

  useEffect(() => {
    console.log("data =>", data);

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

  const finderKeyValue = (key: string) => {
    return form.find((item: any) => item.key === key)?.value || "";
  };

  const updateFilderKeyValue = (key: string, value: string) => {
    setForm((prev: any) => {
      return prev.map((item: any) => {
        if (item.key === key) {
          return { ...item, value };
        }
        return item;
      });
    });
  };

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
          label="نام کامل دارنده کارت"
          placeholder="وارد کنید..."
          value={finderKeyValue("shop_card_holder")}
          onChange={(val) => updateFilderKeyValue("shop_card_holder", val)}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.shop_card_holder}
        />
        {/*         <Input
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
        /> */}
        <TextInput
          label="نام بانک"
          placeholder="وارد کنید..."
          value={finderKeyValue("shop_bank_name")}
          onChange={(val) => updateFilderKeyValue("shop_bank_name", val)}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.shop_bank_name}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="شماره کارت فروشگاه"
          placeholder="0000_0000_0000_0000"
          maxLength={11}
          value={finderKeyValue("shop_card_number")}
          inputAlign="left"
          onChange={(val) => updateFilderKeyValue("shop_card_number", val)}
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.shop_card_number}
        />
        <TextInput
          label="شماره شبا فروشگاه"
          placeholder="0000_0000_0000_0000_0000_0000"
          maxLength={30}
          value={finderKeyValue("shop_iban")}
          inputAlign="left"
          onChange={(val) => updateFilderKeyValue("shop_iban", val)}
          endContent="IR"
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.shop_iban}
        />
      </div>

      <div className="flex items-center cursor-auto text-gray-700 gap-6 justify-between border-t border-b py-3 my-2">
        <p>شبکه های اجتماعی فروشگاه</p>
        <TiSocialLinkedin className="text-2xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label={
            <div className="flex items-center gap-2">
              <LuInstagram className="text-xl text-pink-500" />
              <span>اینستاگرام</span>
            </div>
          }
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://instagram.com
              </span>
            </div>
          }
          value={finderKeyValue("social_instagram")}
          onChange={(val) => updateFilderKeyValue("social_instagram", val)}
        />

        <TextInput
          label={
            <div className="flex items-center gap-2">
              <FaTelegram className="text-xl text-sky-500" />
              <span>تلگرام</span>
            </div>
          }
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">https://t.me</span>
            </div>
          }
          value={finderKeyValue("social_telegram")}
          onChange={(val) => updateFilderKeyValue("social_telegram", val)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/eitaa.png" className="w-5" alt="eitaa" />
              <span>ایتا</span>
            </div>
          }
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://eitaa.com
              </span>
            </div>
          }
          value={finderKeyValue("social_eitaa")}
          onChange={(val) => updateFilderKeyValue("social_eitaa", val)}
        />

        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/rubika.png" className="w-5" alt="rubika" />
              <span>روبیکا</span>
            </div>
          }
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://rubika.ir
              </span>
            </div>
          }
          value={finderKeyValue("social_rubika")}
          onChange={(val) => updateFilderKeyValue("social_rubika", val)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/whatsapp.png" className="w-5" alt="whatsap" />
              <span>واتساپ</span>
            </div>
          }
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://whatsapp.com
              </span>
            </div>
          }
          value={finderKeyValue("social_whatsapp")}
          onChange={(val) => updateFilderKeyValue("social_whatsapp", val)}
        />

        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/balle.jpg" className="w-5" alt="balle" />
              <span>بله</span>
            </div>
          }
          placeholder="username"
          type="text"
          endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">https://ble.ir</span>
            </div>
          }
          value={finderKeyValue("social_bale")}
          onChange={(val) => updateFilderKeyValue("social_bale", val)}
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
