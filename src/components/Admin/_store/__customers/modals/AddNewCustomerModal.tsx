"use client";

import { useState } from "react";
import { Button, DatePicker, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useAddNewUser } from "@/hooks/users/useUsers";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewCustomerModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = !firstName.trim() || !lastName.trim() || !phone || loading;
  //?Hooks
  const addNewUser = useAddNewUser();

  const handleSubmit = async () => {
    if (isDisabled) return;
    setLoading(true);

    const newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      isPhoneVerified: false,
      email: "example@gmail.com",
      password: "123456",
      role: "user",
      isActive: true,
      avatarUrl: "",
      addresses: [],
    };

    addNewUser.mutate(newUser, {
      onSuccess: () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setLoading(false);
        onOpenChange();
      },
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/\D/g, "");
    setPhone(val);
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader>
              <p className="font-normal text-[16px]">مشتری جدید</p>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-6">
              <Input
                autoFocus
                labelPlacement="outside"
                isRequired
                label="نام مشتری"
                placeholder="نام مشتری را وارد کنید"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mb-2"
              />
              <Input
                dir="ltr"
                labelPlacement="outside"
                isRequired
                label="نام خانوادگی مشتری "
                placeholder="نام خوانوادگی مشتری را وارد کنید"
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
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                variant="solid"
                color="secondary"
                isDisabled={isDisabled}
                isLoading={loading}
                onPress={handleSubmit}
              >
                تایید و ثبت
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCustomerModal;
