"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbUsers } from "react-icons/tb";
import SelectableCustomersList from "../SelectableCustomersList";
import { useUsersSelection } from "./UsersSelectionContext";
import { User } from "../customer.types";

const UsersSelectionModal: React.FC = () => {
  const { selectedUsers, setUsers } = useUsersSelection();
  const [isOpen, setIsOpen] = useState(false);

  // state موقت داخل مدال
  const [tempSelectedUsers, setTempSelectedUsers] =
    useState<User[]>(selectedUsers);

  // وقتی مودال باز شد، temp را همگام کن
  useEffect(() => {
    if (isOpen) {
      setTempSelectedUsers(selectedUsers);
    }
  }, [isOpen, selectedUsers]);

  const handleSelectionChange = (user: User, selected: boolean) => {
    setTempSelectedUsers((prev) =>
      selected
        ? [...prev.filter((u) => u.id !== user.id), user]
        : prev.filter((u) => u.id !== user.id)
    );
  };

  const handleConfirm = () => {
    setUsers(tempSelectedUsers); // state اصلی آپدیت میشه
    setIsOpen(false); // بستن مودال
  };

  const handleCancel = () => {
    setIsOpen(false); // فقط بستن مودال
  };

  return (
    <BaseModal
      triggerProps={{ title: "+ افزودن", className: "bg-secondary-light text-secondary" }}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="انتخاب کاربران"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      icon={<TbUsers />}
      size="3xl"
    >
      <SelectableCustomersList
        selectedIds={tempSelectedUsers.map((u) => u.id)}
        onSelectionChange={handleSelectionChange}
      />
    </BaseModal>
  );
};

export default UsersSelectionModal;
