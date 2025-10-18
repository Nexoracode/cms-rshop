"use client";

import React, { useState } from "react";
import SelectableBox from "@/components/Common/SelectionBox/SelectionBox";
import { TbUsersGroup } from "react-icons/tb";
import UserInfoCard from "../UserInfoCard";
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
  const [selectedUsers, setSelectedUsers] = useState<Users[]>(initialUsers);

  const handleConfirm = (users: Users[]) => {
    setSelectedUsers(users);
    onChange?.(users.map((p) => p.id));
    setIsUsersOpen(false);
  };

  return (
    <SelectableBox
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
      <div className="flex flex-col gap-4">
        {selectedUsers.map((user) => (
          <UserInfoCard
            key={user.id}
            infos={user}
            disableSelect
            disableAction
          />
        ))}
      </div>
    </SelectableBox>
  );
};

export default SelectableUsersBox;
