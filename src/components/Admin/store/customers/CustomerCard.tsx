"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";

type UserInfo = {
  id: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  created_at?: string;
};

type Props = {
  infos: UserInfo;
  disableAction?: boolean;
};

const CustomerCard: React.FC<Props> = ({ infos, disableAction = false }) => {
  const { first_name, last_name, phone, email, created_at, id } = infos;

  return (
    <BaseCard className="max-w-[300px] w-full sm:max-w-full" redirect={`customers/create?edit_id=${id}`}>
      <div className="flex flex-col xs:flex-row items-center justify-between">
        <div className="w-full flex flex-col gap-6 px-10">
          <div className="flex items-center justify-between">
            <p className="font-medium">{first_name} {last_name}</p>
            <p className="text-gray-600 text-sm">{phone}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">{email}</p>
            <p className="text-gray-500 text-xs">{created_at?.slice(0, 10)}</p>
          </div>
        </div>
        {!disableAction && <DeleteButton onDelete={() => {}} />}
      </div>
    </BaseCard>
  );
};

export default CustomerCard;
