"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import SelectableCard from "@/components/ui/SelectableCard";
import UserAddressCard from "./UserAddressCard";
import { UserAddress } from "../customer.types";
import FieldErrorText from "@/components/forms/FieldErrorText";

type Props = {
  userId: number;
  addresses: UserAddress[];
  selectedAddressId?: number;
  onChange: (addressId: number) => void;
  addNewButton?: React.ReactNode;
  error?: boolean;
};

const SelectableUserAddressCard: React.FC<Props> = ({
  addresses,
  selectedAddressId,
  onChange,
  addNewButton,
  userId,
  error,
}) => {
  return (
    <>
      <BaseCard
        className={`shadow-none cursor-auto ${
          error ? "border border-red-300" : ""
        }`}
        bodyClassName="grid grid-cols-1 sm:grid-cols-2 gap-2"
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
            <UserAddressCard address={address} userId={userId} />
          </SelectableCard>
        ))}
      </BaseCard>
      {error ? <div className="-mt-4"><FieldErrorText error="انتخاب آدرس الزامی است" /></div> : ""}
    </>
  );
};

export default SelectableUserAddressCard;
