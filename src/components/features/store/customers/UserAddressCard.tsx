"use client";

import React, { useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { LuMapPinned, LuUser } from "react-icons/lu";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineMail } from "react-icons/hi";
import UserAddressModal from "./modals/UserAddressModal";
import { FiPhoneOutgoing } from "react-icons/fi";

export type AddressPayload = {
  id?: number;
  city: string;
  province: string;
  address_line: string;
  plaque: string;
  unit: string;
  address_name?: string | null;
  recipient_name?: string | null;
  recipient_phone?: string | null;
  postal_code: string;
  is_self: boolean;
  is_primary: boolean;
};

type Props = {
  userId: number;
  address: AddressPayload;
};

const UserAddressCard: React.FC<Props> = ({ address, userId }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <>
      <BaseCard wrapperContents onClick={() => setIsAddressModalOpen(true)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="text-gray-800 font-semibold">
            {address.address_name}
          </h4>
          {address.is_primary && (
            <StatusBadge
              isActive
              activeText="پیش‌فرض"
              size="sm"
              className="rounded-full"
            />
          )}
        </div>

        {/* Address Details */}
        <div className="grid gap-3.5 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <LuMapPinned className="text-gray-500 text-[26px] p-1" />
            <span>
              {address.city}, {address.province}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 rounded-md py-1">
            <MdOutlineMapsHomeWork className="text-gray-500 text-[26px] p-1" />
            <span className="truncate">{address.address_line}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <HiOutlineOfficeBuilding className="text-gray-500 text-[26px] p-1" />
            <span>
              پلاک {address.plaque}
              {address.unit ? `, واحد ${address.unit}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 rounded-md py-1">
            <HiOutlineMail className="text-gray-500 text-[26px] p-1" />
            <span>کد پستی: {address.postal_code}</span>
          </div>

          {address.recipient_name && (
            <div className="flex items-center gap-1.5">
              <LuUser className="text-gray-500 text-[26px] p-1" />
              <span>نام تحویل‌گیرنده: {address.recipient_name}</span>
            </div>
          )}
          {address.recipient_phone && (
            <div className="flex items-center gap-1.5 bg-slate-50 rounded-md py-1">
              <FiPhoneOutgoing className="text-gray-500 text-[26px] p-1" />
              <span>شماره تحویل‌گیرنده: {address.recipient_phone}</span>
            </div>
          )}
        </div>
      </BaseCard>

      <UserAddressModal
        userId={userId}
        defaultData={address}
        isOpen={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
      />
    </>
  );
};

export default UserAddressCard;
