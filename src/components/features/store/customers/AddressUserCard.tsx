"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { LuMapPinned } from "react-icons/lu";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineMail } from "react-icons/hi";

export type Address = {
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
  address: Address;
};

const UserAddressCard: React.FC<Props> = ({ address }) => {
  return (
    <BaseCard wrapperContents className="p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-gray-800 font-semibold">{address.address_name}</h4>
        {address.is_primary && (
          <StatusBadge
            isActive
            activeText="پیش‌فرض"
            size="md"
            className="rounded-full"
          />
        )}
      </div>

      {/* Address Details */}
      <div className="grid gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LuMapPinned className="text-gray-500 text-[26px] bg-slate-100 rounded-lg p-1" />
          <span>{address.city}, {address.province}</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 rounded-md py-1">
          <MdOutlineMapsHomeWork className="text-gray-500 text-[26px] bg-slate-200 rounded-lg p-1" />
          <span className="truncate">{address.address_line}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineOfficeBuilding className="text-gray-500 text-[26px] bg-slate-100 rounded-lg p-1" />
          <span>
            پلاک {address.plaque}
            {address.unit ? `, واحد ${address.unit}` : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 rounded-md py-1">
          <HiOutlineMail className="text-gray-500 text-[26px] bg-slate-200 rounded-lg p-1" />
          <span>کد پستی: {address.postal_code}</span>
        </div>
      </div>
    </BaseCard>
  );
};

export default UserAddressCard;
