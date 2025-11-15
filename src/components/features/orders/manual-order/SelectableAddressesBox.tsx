"use client";

import React, { useState } from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import AddressReceiverSelector from "./AddressReceiverSelector";

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

  /** انتخاب آدرس */
  onChange: (addressId: number) => void;

  /** خروجی داده تحویل گیرنده */
  onReceiverChange?: (payload: {
    addressId: number;
    is_self: boolean;
    recipient_name: string | null;
    recipient_phone: string | null;
  }) => void;
};

const SelectableAddressesBox: React.FC<Props> = ({
  addresses,
  selectedAddressId,
  onChange,
  onReceiverChange,
}) => {
  const [receiverData, setReceiverData] = useState<{
    [key: number]: {
      is_self: boolean;
      recipient_name: string | null;
      recipient_phone: string | null;
    };
  }>({});

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
          <div key={address.id} className="w-full">
            <SelectableCard
              id={address.id}
              selectedIds={selectedAddressId ? [selectedAddressId] : []}
              onSelectionChange={(id, selected) => {
                if (selected) {
                  onChange(id as number);

                  // اولیه‌سازی داده اگر وجود ندارد
                  if (!receiverData[address.id]) {
                    setReceiverData((prev) => ({
                      ...prev,
                      [address.id]: {
                        is_self: true,
                        recipient_name: null,
                        recipient_phone: null,
                      },
                    }));
                  }
                }
              }}
            >
              <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
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
              </div>
            </SelectableCard>

            {isSelected && (
              <div className="ml-7 mt-3">
                <AddressReceiverSelector
                  onChange={(data) => {
                    setReceiverData((prev) => ({
                      ...prev,
                      [address.id]: data,
                    }));

                    onReceiverChange?.({
                      addressId: address.id,
                      ...data,
                    });
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SelectableAddressesBox;
