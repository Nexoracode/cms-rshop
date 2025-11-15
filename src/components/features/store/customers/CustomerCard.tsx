"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import { FiUser } from "react-icons/fi";
import CardRows from "@/components/shared/CardRows";
import StatusBadge from "@/components/shared/StatusBadge";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Customer } from "./customer.types";

type Props = {
  infos: Customer;
  disableAction?: boolean;
  showDeselectIcon?: boolean;
  onDelete?: (id: number) => void;
};

const CustomerCard: React.FC<Props> = ({
  infos,
  disableAction = false,
  showDeselectIcon = false,
  onDelete,
}) => {
  const { id, first_name, last_name, phone, email, avatar_url, is_active, is_phone_verified } =
    infos;

  const rowItems = [
    { label: "شماره تماس", value: phone || "-", bgLabel: is_phone_verified ? "bg-green-50 text-green-700 rounded-md px-2 py-1" : "bg-red-50 text-red-700 rounded-md px-2 py-1" },
    { label: "ایمیل", value: email || "-" },
  ];

  return (
    <BaseCard
      bodyClassName="w-full min-w-[341px]"
      redirect={`/admin/store/customers/create?edit_id=${id}`}
    >
      <div className="flex items-center gap-2 mb-2">
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
            <StatusBadge isActive={is_active} size="sm" />
          </div>

          {!disableAction && <DeleteButton onDelete={() => onDelete?.(id)} />}
          {showDeselectIcon && (
            <div className="bg-slate-100 rounded-full text-xl p-1.5 hover:bg-red-50 hover:text-red-600 transition-all">
              <AiOutlineCloseCircle
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete?.(id);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CustomerCard;
