"use client";

import React, { useEffect, useState } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import CustomerCard from "../CustomerCard";
import UsersSelectionModal from "./CustomersSelectionModal";
import { useCustomersSelection } from "./CustomersSelectionContext";
import { Customer } from "../customer.types";
import { FiUsers } from "react-icons/fi";

type Props = {
  onChange?: (userIds: number[]) => void;
  initialUsers?: Customer[];
  error?: boolean;
};

const InnerSelectableUsersBox: React.FC<{
  onChange?: (ids: number[]) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedCustomers, removeCustomer } = useCustomersSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log("Customer Ok");
    
    onChange?.(selectedCustomers.map((u) => u.id));
  }, [selectedCustomers]);

  return (
    <SelectionBox
      title="کاربران انتخاب شده"
      icon={<FiUsers className="text-5xl" />}
      initial={selectedCustomers}
      modal={<UsersSelectionModal />}
      error={error}
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

const SelectableCustomersBox: React.FC<Props> = ({ onChange, error }) => {
  return <InnerSelectableUsersBox onChange={onChange} error={error} />;
};

export default SelectableCustomersBox;
