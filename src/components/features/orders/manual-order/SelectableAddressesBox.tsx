"use client";

import React from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import BaseCard from "@/components/ui/BaseCard";
import { HiOutlineOfficeBuilding, HiOutlineMail } from "react-icons/hi";
import { LuMapPinned } from "react-icons/lu";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import StatusBadge from "@/components/shared/StatusBadge";

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
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LuMapPinned className="text-gray-500 text-[26px] bg-slate-100 rounded-lg p-1" />
          <span>
            {address.city}, {address.province}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineMapsHomeWork className="text-gray-500 text-[26px] bg-slate-100 rounded-lg p-1" />
          <span className="truncate">{address.address_line}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineOfficeBuilding className="text-gray-500 text-[26px] bg-slate-100 rounded-lg p-1" />
          <span>
            پلاک {address.plaque}
            {address.unit ? `, واحد ${address.unit}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineMail className="text-gray-500 text-[26px] bg-slate-100 rounded-lg p-1" />
          <span>کد پستی: {address.postal_code}</span>
        </div>
      </div>
    );
  };

  return (
    <BaseCard
      className="shadow-none cursor-auto"
      bodyClassName="flex flex-col gap-2"
      CardHeaderProps={{
        title: "آدرس های کاربر",
        className: "p-2",
        children: <>افزودن آدرس</>,
      }}
    >
      {addresses.map((address) => {
        return (
          <SelectableCard
            key={address.id}
            id={address.id}
            selectedIds={selectedAddressId ? [selectedAddressId] : []}
            onSelectionChange={(id, selected) => {
              if (selected) onChange(id as number);
            }}
          >
            <BaseCard className="p-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-gray-800 text-base flex items-center gap-2">
                  {address.address_name}
                </h4>
                {address.is_primary && (
                  <StatusBadge
                    isActive={true}
                    size="md"
                    activeText="پیش‌فرض"
                    className="rounded-full"
                  />
                )}
              </div>

              {formatAddress(address)}
            </BaseCard>
          </SelectableCard>
        );
      })}
    </BaseCard>
  );
};

export default SelectableAddressesBox;
