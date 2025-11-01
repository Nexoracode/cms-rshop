"use client";

import React, { useEffect, useState } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { TbUsersGroup } from "react-icons/tb";
import CustomerCard from "../CustomerCard";
import UsersSelectionModal from "./UsersSelectionModal";

type Users = any;

type Props = {
  onChange?: (users: number[]) => void;
  initialUsers?: Users[];
};

const SelectableUsersBox: React.FC<Props> = ({
  onChange,
  initialUsers = [],
}) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Users[]>([]);

  useEffect(() => {
    if (!initialUsers.length) return;
    setSelectedUsers(initialUsers);
  }, [initialUsers]);

  const handleConfirm = (users: Users[]) => {
    setSelectedUsers(users);
    onChange?.(users.map((p) => p.id));
    setIsUsersOpen(false);
  };

  return (
    <SelectionBox
      title="کاربران انتخاب شده"
      icon={<TbUsersGroup className="text-5xl" />}
      initial={selectedUsers}
      onOpen={() => setIsUsersOpen(true)}
      modal={
        <UsersSelectionModal
          isOpen={isUsersOpen}
          onOpenChange={setIsUsersOpen}
          onConfirm={handleConfirm}
          selectedIds={selectedUsers.map((p) => p.id)}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedUsers.map((user) => (
          <CustomerCard key={user.id} infos={user} disableAction />
        ))}
      </div>
    </SelectionBox>
  );
};

export default SelectableUsersBox;
