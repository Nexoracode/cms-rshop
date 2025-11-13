"use client";

import React from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SelectableCard from "@/components/ui/SelectableCard";

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
  recipient_name?: string;
  recipient_phone?: string;
};

type SelectableAddressesBoxProps = {
  addresses: Address[];
  selectedAddressId?: number;
  onChange: (addressId: number) => void;
};

const SelectableAddressesBox: React.FC<SelectableAddressesBoxProps> = ({
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
    <div className="flex flex-col gap-3">
      {addresses.map((address) => (
        <SelectableCard
          key={address.id}
          id={address.id}
          selectedIds={selectedAddressId ? [selectedAddressId] : []}
          onSelectionChange={(id, isSelected) => {
            if (isSelected) {
              onChange(id as number);
            }
          }}
        >
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
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
            {address.recipient_name && (
              <p className="text-xs text-gray-500">
                تحویل گیرنده: {address.recipient_name}
                {address.recipient_phone && ` - ${address.recipient_phone}`}
              </p>
            )}
          </div>
        </SelectableCard>
      ))}
    </div>
  );
};

export default SelectableAddressesBox;
