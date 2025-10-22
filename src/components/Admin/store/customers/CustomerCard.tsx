"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import { FiUser } from "react-icons/fi";
import CardRows from "@/components/shared/CardRows";

type UserInfo = {
  id: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  avatar_url: string;
  is_active: boolean;
};

type Props = {
  infos: UserInfo;
  disableAction?: boolean;
};

const CustomerCard: React.FC<Props> = ({ infos, disableAction = false }) => {
  const { id, first_name, last_name, phone, email, avatar_url, is_active } =
    infos;

  const rowItems = [
    { label: "شماره تماس", value: phone || "-" },
    { label: "ایمیل", value: email || "-" },
  ];

  return (
    <BaseCard
      bodyClassName="w-full"
      redirect={`customers/create?edit_id=${id}`}
    >
      <div className="flex items-center gap-2 mb-2 p-2">
        <div>
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={`${first_name || "-"} ${last_name || "-"}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FiUser className="text-gray-400 text-2xl" />
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="truncate text-right">
              {first_name || "-"} {last_name || "-"}
            </p>
            <span
              className={`px-3 py-1 rounded-lg text-xs w-fit ${
                is_active
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {is_active ? "فعال" : "غیرفعال"}
            </span>
          </div>

          {!disableAction && <DeleteButton onDelete={() => {}} />}
        </div>
      </div>

      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CustomerCard;
