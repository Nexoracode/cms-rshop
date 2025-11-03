"use client";

import { useState } from "react";
import { DatePicker, Input } from "@heroui/react";
import { useAddNewUser } from "@/hooks/api/users/useUsers";
import BaseModal from "@/components/ui/modals/BaseModal";

const AddNewCustomerModal: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !firstName.trim() || !lastName.trim() || !phone || loading;

  const addNewUser = useAddNewUser();

  const handleConfirm = async (close: (open: boolean) => void) => {
    if (isDisabled) return false;

    setLoading(true);

    const newUser = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      is_phone_verified: false,
      email: "example@gmail.com",
      password: "123456",
      role: "user",
      is_active: true,
      avatar_url: "",
      addresses: [],
    };

    return new Promise<boolean>((resolve) => {
      addNewUser.mutate(newUser, {
        onSuccess: () => {
          setFirstName("");
          setLastName("");
          setPhone("");
          setLoading(false);
          close(false);
          resolve(true);
        },
        onError: () => {
          setLoading(false);
          resolve(false); // مدال بسته نشه
        },
      });
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    setPhone(val);
  };

  return (
    <BaseModal
      title="مشتری جدید"
      confirmText="تأیید و ثبت"
      cancelText="لغو"
      isConfirmDisabled={isDisabled}
      onConfirm={handleConfirm}
      size="lg"
      triggerProps={{
        className: "bg-secondary-light text-secondary",
        title: "+ افزودن",
      }}
    >
      <div className="flex flex-col gap-6">
        <Input
          autoFocus
          labelPlacement="outside"
          isRequired
          label="نام مشتری"
          placeholder="نام مشتری را وارد کنید"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          dir="ltr"
          labelPlacement="outside"
          isRequired
          label="نام خانوادگی مشتری"
          placeholder="نام خانوادگی مشتری را وارد کنید"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          style={{ direction: "ltr" }}
          placeholder="09XXXXXXXXXX"
          labelPlacement="outside"
          isRequired
          label="شماره تماس"
          type="tel"
          inputMode="tel"
          variant="flat"
          maxLength={11}
          value={phone}
          onChange={handlePhoneChange}
        />
        <DatePicker label="تاریخ تولد" labelPlacement="outside" />
      </div>
    </BaseModal>
  );
};

export default AddNewCustomerModal;