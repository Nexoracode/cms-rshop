"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbUsers } from "react-icons/tb";
import SelectableCustomersList from "./SelectableCustomersList";
import { useUsersSelection } from "./UsersSelectionContext";
import { User } from "../customer.types";

const UsersSelectionModal: React.FC = () => {
  const { selectedUsers, setUsers } = useUsersSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] =
    useState<User[]>(selectedUsers);

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
    setUsers(tempSelectedUsers);
    setIsOpen(false);
  };

  return (
    <BaseModal
      triggerProps={{ title: "+ افزودن", className: "bg-secondary-light text-secondary" }}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="انتخاب کاربران"
      confirmText="تأیید انتخاب"
      onConfirm={handleConfirm}
      onCancel={() => setIsOpen(false)}
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
