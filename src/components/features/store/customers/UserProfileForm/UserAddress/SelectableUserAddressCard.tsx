"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import SelectableCard from "@/components/ui/SelectableCard";
import UserAddressCard from "./UserAddressCard";
import { UserAddress } from "../../customer.types";
import FieldErrorText from "@/components/forms/FieldErrorText";
import UserAddressModal from "../../modals/UserAddressModal";

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
      <div
        className={`w-full flex flex-col items-center gap-3 ${
          error ? "border border-red-300" : ""
        }`}
      >
        <div className="w-full flex items-center gap-6 justify-between pt-3 border-t border-slate-200">
          <p>آدرس ها</p>
          <UserAddressModal userId={userId} />
        </div>
        <div className="w-full flex flex-col gap-4 pt-6">
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
        </div>
      </div>

      {error ? (
        <div className="-mt-4">
          <FieldErrorText error="انتخاب آدرس الزامی است" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SelectableUserAddressCard;
