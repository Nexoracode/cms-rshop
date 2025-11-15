"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { useAddNewUser } from "@/core/hooks/api/users/useUsers";
import BaseModal from "@/components/ui/modals/BaseModal";
import { FiUserPlus } from "react-icons/fi";
import TextInput from "@/components/ui/inputs/TextInput";

const AddNewCustomerModal: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const addNewUser = useAddNewUser();

  const addNewUserHandler = async (close: (open: boolean) => void) => {
    let formattedPhone = phone.trim();

    if (!formattedPhone.startsWith("0")) {
      formattedPhone = "0" + formattedPhone;
    }

    const newUser = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      password: null,
    };

    addNewUser.mutate(newUser, {
      onSuccess: () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        close(false);
        setIsOpen(false);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="افزودن کاربر جدید"
      confirmText="تأیید و ثبت"
      cancelText="لغو"
      onConfirm={addNewUserHandler}
      size="lg"
      triggerProps={{
        className: "bg-secondary-light text-secondary",
        title: "+ افزودن",
      }}
      icon={<FiUserPlus />}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <TextInput
            label="نام"
            placeholder="نام را وارد کنید"
            value={firstName}
            onChange={setFirstName}
            isRequired
          />

          <TextInput
            label="نام خانوادگی"
            placeholder="نام خانوادگی را وارد کنید"
            value={lastName}
            onChange={setLastName}
            isRequired
          />
        </div>

        <TextInput
          label="شماره تماس"
          placeholder="09XXXXXXXXXX"
          value={phone}
          onChange={setPhone}
          type="tel"
          maxLength={11}
          minLength={11}
          isRequired
          inputAlign="left"
          allowChars={false}
        />
      </div>
    </BaseModal>
  );
};

export default AddNewCustomerModal;
