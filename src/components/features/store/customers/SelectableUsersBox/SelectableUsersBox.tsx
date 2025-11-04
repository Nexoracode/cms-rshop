"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { TbUsersGroup } from "react-icons/tb";
import CustomerCard from "../CustomerCard";
import UsersSelectionModal from "./UsersSelectionModal";
import { useUsersSelection } from "./UsersSelectionContext";
import { User } from "../customer.types";

type Props = {
  onChange?: (userIds: number[]) => void;
  initialUsers?: User[];
};

const InnerSelectableUsersBox: React.FC<{
  onChange?: (userIds: number[]) => void;
}> = ({ onChange }) => {
  const { selectedUsers, removeUser } = useUsersSelection();

  useEffect(() => {
    console.log(selectedUsers);
    
    onChange?.(selectedUsers.map((u) => u.id));
  }, [selectedUsers]);

  return (
    <SelectionBox
      title="کاربران انتخاب شده"
      icon={<TbUsersGroup className="text-5xl" />}
      initial={selectedUsers}
      modal={<UsersSelectionModal />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedUsers.map((user: User) => (
          <CustomerCard
            key={user.id}
            showDeselectIcon
            disableAction
            infos={user}
            onDelete={removeUser}
          />
        ))}
      </div>
    </SelectionBox>
  );
};

const SelectableUsersBox: React.FC<Props> = ({ onChange }) => {
  return <InnerSelectableUsersBox onChange={onChange} />;
};

export default SelectableUsersBox;
