"use client";

import React, { useState } from "react";
import SelectableBox from "@/components/common/SelectionBox/SelectionBox";
import UserInfoCard from "@/components/Admin/_store/__customers/UserInfoCard";
import UsersSelectionModal from "@/components/Admin/_store/__customers/SelectableUsersBox/UsersSelectionModal";
import { BiCategoryAlt } from "react-icons/bi";

type Product = any;

type Props = {
  onChange?: (products: Product[]) => void;
  initialUsers?: Product[];
};

const SelectableCategoriesBox: React.FC<Props> = ({
  onChange,
  initialUsers = [],
}) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Product[]>(initialUsers);

  const handleConfirm = (products: Product[]) => {
    setSelectedUsers(products);
    onChange?.(products);
    setIsUsersOpen(false);
  };

  return (
    <SelectableBox
      title="دسته بندی ها انتخاب شده"
      icon={<BiCategoryAlt className="text-5xl" />}
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

export default SelectableCategoriesBox;
