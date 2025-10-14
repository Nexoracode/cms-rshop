"use client";

import React, { useState } from "react";
import SelectableBox from "@/components/common/SelectionBox/SelectionBox";
import UserInfoCard from "../../_store/__customers/UserInfoCard";
import UsersSelectionModal from "../../_store/__customers/SelectableUsersBox/UsersSelectionModal";
import { MdOutlineCategory } from "react-icons/md";
import VariantsSelectionModal from "./VariantsSelectionModal";

type Product = any;

type Props = {
  onChange?: (products: Product[]) => void;
  initialVariants?: Product[];
};

const SelectableVariantsBox: React.FC<Props> = ({
  onChange,
  initialVariants = [],
}) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Product[]>(initialVariants);

  const handleConfirm = (products: Product[]) => {
    setSelectedUsers(products);
    onChange?.(products);
    setIsUsersOpen(false);
  };

  return (
    <SelectableBox
      title="تنوع محصول ها انتخاب شده"
      icon={<MdOutlineCategory className="text-5xl" />}
      initial={selectedUsers}
      onOpen={() => setIsUsersOpen(true)}
      modal={
        <VariantsSelectionModal
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

export default SelectableVariantsBox;
