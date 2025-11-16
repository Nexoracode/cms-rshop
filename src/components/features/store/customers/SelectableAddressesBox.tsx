"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import SelectableCard from "@/components/ui/SelectableCard";
import UserAddressCard, { Address } from "./AddressUserCard";
import StatusBadge from "@/components/shared/StatusBadge";

type Props = {
  addresses: Address[];
  selectedAddressId?: number;
  onChange: (addressId: number) => void;
  addNewButton?: React.ReactNode; // برای دکمه + آدرس جدید
};

const SelectableAddressesBox: React.FC<Props> = ({
  addresses,
  selectedAddressId,
  onChange,
  addNewButton,
}) => {
  return (
    <BaseCard
      className="shadow-none cursor-auto"
      bodyClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
      CardHeaderProps={{
        title: "آدرس های کاربر",
        children: addNewButton,
      }}
    >
      {addresses.map((address) => (
        <SelectableCard
          key={address.id}
          id={address.id}
          selectedIds={selectedAddressId ? [selectedAddressId] : []}
          onSelectionChange={(id, selected) => {
            if (selected) onChange(id as number);
          }}
        >
          <UserAddressCard address={address} />
        </SelectableCard>
      ))}
    </BaseCard>
  );
};

export default SelectableAddressesBox;
