"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { TbUsersGroup } from "react-icons/tb";
import CustomerCard from "../CustomerCard";
import UsersSelectionModal from "./CustomersSelectionModal";
import { useCustomersSelection } from "./CustomersSelectionContext";
import { Customer } from "../customer.types";

type Props = {
  onChange?: (userIds: number[]) => void;
  initialUsers?: Customer[];
};

const InnerSelectableUsersBox: React.FC<{
  onChange?: (ids: number[]) => void;
}> = ({ onChange }) => {
  const { selectedCustomers, removeCustomer } = useCustomersSelection();

  useEffect(() => {
    onChange?.(selectedCustomers.map((u) => u.id));
  }, [selectedCustomers]);

  return (
    <SelectionBox
      title="کاربران انتخاب شده"
      icon={<TbUsersGroup className="text-5xl" />}
      initial={selectedCustomers}
      modal={<UsersSelectionModal />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedCustomers.map((user: Customer) => (
          <CustomerCard
            key={user.id}
            showDeselectIcon
            disableAction
            infos={user}
            onDelete={removeCustomer}
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
