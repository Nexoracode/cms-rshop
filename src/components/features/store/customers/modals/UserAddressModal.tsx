"use client";

import React, { useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import EmailInput from "@/components/shared/EmailInput";
import RadioGroup from "@/components/ui/RadioGroup";
import ProvinceCitySelector from "@/components/shared/ProvinceCitySelector";
import { Checkbox } from "@heroui/react";
import { LuMapPinHouse } from "react-icons/lu";
import Textarea from "@/components/ui/inputs/Textarea";
//import { useAddNewUserAddress } from "@/core/hooks/api/users/useUsers";
/*   */

type UserAddressModalProps = {
  btnAdd?: React.ReactNode;
};

const UserAddressModal: React.FC<UserAddressModalProps> = ({
  btnAdd = null,
}) => {
  const [form, setForm] = useState({
    receiverType: "self", // self | other
    receiverName: "",
    receiverPhone: "",
    receiverPhoneValid: true,

    // address
    province: "",
    city: "",
    address_line: "",
    postal_code: "",
    is_primary: false,
  });

  ///const addAddressRequest = useAddNewUserAddress();

  const resetForm = () =>
    setForm({
      receiverType: "self",
      receiverName: "",
      receiverPhone: "",
      receiverPhoneValid: true,
      province: "",
      city: "",
      address_line: "",
      postal_code: "",
      is_primary: false,
    });

  const handleSubmit = async () => {
    if (form.receiverType === "other" && !form.receiverPhoneValid) {
      return false;
    }

    const payload = {
      receiver_name:
        form.receiverType === "self" ? undefined : form.receiverName?.trim(),
      receiver_phone:
        form.receiverType === "self" ? undefined : form.receiverPhone,
      province: form.province,
      city: form.city,
      address_line: form.address_line.trim(),
      postal_code: form.postal_code.trim(),
      is_primary: form.is_primary,
    };

    /*  return addAddressRequest
      .mutateAsync(payload)
      .then((res) => {
        if (res.ok) {
          resetForm();
          return true;
        }
        return false;
      })
      .catch(() => false); */
  };

  return (
    <BaseModal
      title="ثبت آدرس جدید"
      confirmText="ثبت آدرس"
      cancelText="لغو"
      //onConfirm={handleSubmit}
      onCancel={resetForm}
      size="lg"
      trigger={btnAdd}
      triggerProps={
        btnAdd
          ? null
          : {
              className: "bg-secondary-light text-secondary",
              title: "+ افزودن آدرس",
            }
      }
      icon={<LuMapPinHouse />}
    >
      <div className="flex flex-col gap-6">
        {/* رادیو */}
        <RadioGroup
          label="انتخاب نوع تحویل‌گیرنده"
          value={form.receiverType}
          onChange={(val) => setForm((p) => ({ ...p, receiverType: val }))}
          options={[
            { label: "آدرس برای خود مشتری", value: "self" },
            { label: "آدرس برای شخص دیگر", value: "other" },
          ]}
          radioSize="sm"
          groupClassName="flex items-center gap-4"
          orientation="horizontal"
        />

        {/* ورودی‌های تحویل‌گیرنده */}
        {form.receiverType === "other" && (
          <div className="flex items-center gap-4">
            <TextInput
              label="نام تحویل‌گیرنده"
              value={form.receiverName}
              onChange={(val) => setForm({ ...form, receiverName: val })}
              placeholder="مثلاً: علی رضایی"
              isRequired
              allowEnglishOnly={false}
              inputAlign="right"
            />

            <PhoneInput
              value={form.receiverPhone}
              onChange={(val, valid) =>
                setForm({
                  ...form,
                  receiverPhone: val,
                  receiverPhoneValid: valid,
                })
              }
              label="شماره تماس تحویل‌گیرنده"
              placeholder="09xxxxxxxxx"
              isRequired
            />
          </div>
        )}

        {/* فرم آدرس */}
        <div className="flex flex-col gap-4">
          <ProvinceCitySelector
            provinceId={form.province}
            cityId={form.city}
            onChange={({ province, city }) =>
              setForm((prev) => ({ ...prev, province, city }))
            }
          />

          <TextInput
            label="کد پستی"
            placeholder="مثلاً: 1234567890"
            minLength={11}
            maxLength={11}
            inputAlign="left"
            value={form.postal_code}
            onChange={(val) => setForm({ ...form, postal_code: val })}
          />

          <Textarea
            value={form.address_line}
            onChange={(value, isValid) =>
              setForm((prev) => ({ ...prev, address_line: value }))
            }
          />

          <Checkbox
            isSelected={form.is_primary}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, is_primary: value }))
            }
          >
            <span className="text-sm">آدرس اصلی</span>
          </Checkbox>
        </div>
      </div>
    </BaseModal>
  );
};

export default UserAddressModal;
