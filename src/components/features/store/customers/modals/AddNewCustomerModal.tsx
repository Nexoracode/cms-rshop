"use client";

import { useState } from "react";
import { useAddNewUser } from "@/core/hooks/api/users/useUsers";
import BaseModal from "@/components/ui/modals/BaseModal";
import { FiUserPlus } from "react-icons/fi";
import TextInput from "@/components/ui/inputs/TextInput";
import EmailInput from "@/components/shared/EmailInput";
import PhoneInput from "@/components/shared/PhoneInput";

const AddNewCustomerModal: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    phoneValid: true,
    email: "",
    emailValid: true,
  });

  const addNewUser = useAddNewUser();

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      phoneValid: true,
      email: "",
      emailValid: true,
    });
  };

  const addNewUserHandler = async () => {
    if (!form.emailValid || !form.phoneValid) return false;

    const newUser = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      phone: form.phone,
      password: "123456@Ss",
      email: form.email ? form.email.trim() : undefined,
    };

    return addNewUser
      .mutateAsync(newUser)
      .then((res) => {
        if (res.ok) {
          resetForm();
          return true;
        }
        return false;
      })
      .catch(() => false);
  };

  return (
    <BaseModal
      title="افزودن کاربر جدید"
      confirmText="تأیید و ثبت"
      cancelText="لغو"
      onConfirm={addNewUserHandler}
      onCancel={resetForm}
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
            value={form.firstName}
            onChange={(v) => setForm({ ...form, firstName: v })}
            isRequired
          />

          <TextInput
            label="نام خانوادگی"
            placeholder="نام خانوادگی را وارد کنید"
            value={form.lastName}
            onChange={(v) => setForm({ ...form, lastName: v })}
            isRequired
          />
        </div>

        <div className="flex items-center gap-2">
          <PhoneInput
            value={form.phone}
            onChange={(val, valid) =>
              setForm({ ...form, phone: val, phoneValid: valid })
            }
          />
          
          <EmailInput
            value={form.email}
            onChange={(val, valid) =>
              setForm({ ...form, email: val, emailValid: valid })
            }
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNewCustomerModal;