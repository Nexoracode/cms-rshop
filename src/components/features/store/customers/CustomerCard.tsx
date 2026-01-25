"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import { FiUser } from "react-icons/fi";
import CardRows from "@/components/shared/CardRows";
import StatusBadge from "@/components/shared/StatusBadge";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Customer } from "./customer.types";
import UserAddressModal from "./modals/UserAddressModal";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { useDeleteUser } from "@/core/hooks/api/users/useUsers";

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
  const {
    id,
    first_name,
    last_name,
    phone,
    email,
    avatar_url,
    is_active,
    is_phone_verified,
  } = infos;

  const deleteMutation = useDeleteUser(id);

  const rowItems = [
    {
      label: "شماره تماس",
      value: phone || "-",
      bgLabel: is_phone_verified
        ? "bg-green-50 text-green-700 rounded-md px-2 py-1"
        : "bg-red-50 text-red-700 rounded-md px-2 py-1",
    },
    { label: "ایمیل", value: email || "-" },
  ];

  return (
    <BaseCard
      bodyClassName="w-full hover-reveal-parent"
      redirect={`/admin/store/customers/create?edit_id=${id}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div>
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={`${first_name || "-"} ${last_name || "-"}`}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
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

          <div className="hover-reveal-child flex items-center gap-1.5">
            <UserAddressModal
              userId={id}
              btnAdd={
                <ActionButton icon={<MdOutlineAddLocationAlt size={19} />} />
              }
            />
            {!disableAction && (
              <DeleteButton onDelete={() => deleteMutation.mutate()} />
            )}
            {showDeselectIcon && (
              <ActionButton
                icon={<AiOutlineCloseCircle size={18} />}
                onClick={() => {
                  /* e.preventDefault();
                    e.stopPropagation(); */
                  onDelete?.(id);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CustomerCard;
