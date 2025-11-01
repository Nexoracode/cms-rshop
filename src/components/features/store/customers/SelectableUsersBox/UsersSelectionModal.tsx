// UsersSelectionModal.tsx
"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbUsers } from "react-icons/tb";
import SelectableCustomersList from "../SelectableCustomersList";
import { useUsersSelection } from "./UsersSelectionContext";

const UsersSelectionModal: React.FC = () => {
  const { selectedUsers, addUser, removeUser } = useUsersSelection();

  const handleSelectionChange = (user: any, selected: boolean) => {
    if (selected) addUser(user);
    else removeUser(user.id);
  };

  return (
    <BaseModal
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      title="انتخاب کاربران"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      onConfirm={() => {}}
      icon={<TbUsers />}
      size="3xl"
    >
      <SelectableCustomersList
        selectedIds={selectedUsers.map(u => u.id)}
        onSelectionChange={handleSelectionChange}
      />
    </BaseModal>
  );
};

export default UsersSelectionModal;
