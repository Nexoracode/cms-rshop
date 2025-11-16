"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import RadioGroup from "@/components/ui/RadioGroup";
import ProvinceCitySelector from "@/components/shared/ProvinceCitySelector";
import { Checkbox } from "@heroui/react";
import { LuMapPinHouse } from "react-icons/lu";
import Textarea from "@/components/ui/inputs/Textarea";
import {
  useAddNewUserAddress,
  useUpdateUserAddress,
} from "@/core/hooks/api/users/useAddressUsers";

type AddressPayload = {
  id?: number;
  city: string;
  province: string;
  address_line: string;
  plaque: string;
  unit: string;
  address_name?: string | null;
  recipient_name?: string | null;
  recipient_phone?: string | null;
  postal_code: string;
  is_self: boolean;
  is_primary: boolean;
};

type UserAddressModalProps = {
  btnAdd?: React.ReactNode;
  userId: number;
  defaultData?: AddressPayload; // اگر اپدیت است
};

const UserAddressModal: React.FC<UserAddressModalProps> = ({
  btnAdd = null,
  userId,
  defaultData,
}) => {
  const [form, setForm] = useState<AddressPayload>({
    id: 0,
    city: "",
    province: "",
    address_line: "",
    plaque: "",
    unit: "",
    address_name: null,
    recipient_name: null,
    recipient_phone: null,
    postal_code: "",
    is_self: true,
    is_primary: false,
  });

  const addAddressMutation = useAddNewUserAddress(userId);
  const updateAddressMutation = defaultData
    ? useUpdateUserAddress(userId, defaultData.id || 0)
    : null;

  // اگر defaultData داریم، فرم رو پر کن
  useEffect(() => {
    if (defaultData) {
      setForm(defaultData);
    }
  }, [defaultData]);

  const resetForm = () => {
    setForm({
      city: "",
      province: "",
      address_line: "",
      plaque: "",
      unit: "",
      address_name: null,
      recipient_name: null,
      recipient_phone: null,
      postal_code: "",
      is_self: true,
      is_primary: false,
    });
  };

  const handleSubmit = async () => {
    const payload: AddressPayload = {
      ...form,
      recipient_name: form.is_self ? null : form.recipient_name,
      recipient_phone: form.is_self ? null : form.recipient_phone,
    };

    if (defaultData && updateAddressMutation) {
      return updateAddressMutation.mutateAsync(payload).then((res) => {
        resetForm();
        return true;
      });
    } else {
      return addAddressMutation.mutateAsync(payload).then((res) => {
        resetForm();
        return true;
      });
    }
  };

  return (
    <BaseModal
      title={defaultData ? "ویرایش آدرس" : "ثبت آدرس جدید"}
      confirmText={defaultData ? "بروزرسانی" : "ثبت آدرس"}
      cancelText="لغو"
      onConfirm={handleSubmit}
      onCancel={resetForm}
      size="lg"
      trigger={btnAdd}
      triggerProps={
        btnAdd
          ? null
          : {
              className: "bg-secondary-light text-secondary",
              title: defaultData ? "ویرایش آدرس" : "+ افزودن آدرس",
            }
      }
      icon={<LuMapPinHouse />}
    >
      <div className="flex flex-col gap-6">
        <RadioGroup
          label="نوع تحویل‌گیرنده"
          value={form.is_self ? "self" : "other"}
          onChange={(val) =>
            setForm((prev) => ({ ...prev, is_self: val === "self" }))
          }
          options={[
            { label: "برای خود مشتری", value: "self" },
            { label: "برای شخص دیگر", value: "other" },
          ]}
          radioSize="sm"
          orientation="horizontal"
          groupClassName="flex items-center gap-4"
        />

        {!form.is_self && (
          <div className="flex items-center gap-4">
            <TextInput
              label="نام تحویل‌گیرنده"
              value={form.recipient_name || ""}
              onChange={(val) => setForm({ ...form, recipient_name: val })}
              placeholder="مثلاً: علی رضایی"
              isRequired
              allowEnglishOnly={false}
              inputAlign="right"
            />
            <PhoneInput
              value={form.recipient_phone || ""}
              onChange={(val) => setForm({ ...form, recipient_phone: val })}
              label="شماره تماس تحویل‌گیرنده"
              placeholder="09xxxxxxxxx"
              isRequired
            />
          </div>
        )}

        <ProvinceCitySelector
          provinceId={form.province}
          cityId={form.city}
          onChange={({ province, city }) =>
            setForm((prev) => ({ ...prev, province, city }))
          }
        />

        <div className="flex items-center gap-2">
          <TextInput
            label="نام آدرس"
            placeholder="مثلا محل کار یا خانه و..."
            value={form.address_name || ""}
            onChange={(val) => setForm({ ...form, address_name: val })}
          />

          <TextInput
            label="کد پستی"
            placeholder="مثلاً: 1234567890"
            minLength={11}
            maxLength={11}
            inputAlign="left"
            allowChars={false}
            value={form.postal_code}
            onChange={(val) => setForm({ ...form, postal_code: val })}
          />
        </div>

        <div className="flex items-center gap-2">
          <TextInput
            label="پلاک"
            placeholder="شماره پلاک"
            allowChars={false}
            value={form.plaque}
            onChange={(val) => setForm({ ...form, plaque: val })}
          />

          <TextInput
            label="واحد"
            placeholder="شماره واحد"
            allowChars={false}
            value={form.unit}
            onChange={(val) => setForm({ ...form, unit: val })}
          />
        </div>

        <Textarea
          value={form.address_line}
          onChange={(value) => setForm({ ...form, address_line: value })}
          placeholder="آدرس کامل را وارد کنید"
        />

        <Checkbox
          isSelected={form.is_primary}
          onValueChange={(val) => setForm({ ...form, is_primary: val })}
        >
          <span className="text-sm">آدرس اصلی</span>
        </Checkbox>
      </div>
    </BaseModal>
  );
};

export default UserAddressModal;
