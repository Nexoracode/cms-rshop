"use client";

import React from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import BaseCard from "@/components/ui/BaseCard";

type Address = {
  id: number;
  address_line: string;
  address_name: string;
  city: string;
  province: string;
  postal_code: string;
  plaque: string;
  unit: string;
  is_primary: boolean;
};

type Props = {
  addresses: Address[];
  selectedAddressId?: number;
  onChange: (addressId: number) => void;
};

const SelectableAddressesBox: React.FC<Props> = ({
  addresses,
  selectedAddressId,
  onChange,
}) => {
  const formatAddress = (address: Address) => {
    return `${address.address_line}, پلاک ${address.plaque}${
      address.unit ? `, واحد ${address.unit}` : ""
    }, ${address.city}, ${address.province}, کد پستی: ${address.postal_code}`;
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {addresses.map((address) => {
        const isSelected = selectedAddressId === address.id;

        return (
          <SelectableCard
            key={address.id}
            id={address.id}
            selectedIds={selectedAddressId ? [selectedAddressId] : []}
            onSelectionChange={(id, selected) => {
              if (selected) {
                onChange(id as number);
              }
            }}
          >
            <BaseCard className={`p-3 ${isSelected ? "border-blue-300" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">
                  {address.address_name}
                  {address.is_primary && (
                    <span className="mr-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      پیش‌فرض
                    </span>
                  )}
                </h4>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {formatAddress(address)}
              </p>
            </BaseCard>
          </SelectableCard>
        );
      })}
    </div>
  );
};

export default SelectableAddressesBox;
