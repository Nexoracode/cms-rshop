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
import { HiOutlineUser } from "react-icons/hi2";

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
      label: "نام کامل ",
      value: `${first_name || "نام"} ${last_name || "و نام خوانوادگی"}`
    },
    {
      label: "شماره تماس",
      value: phone || "-",
      bgLabel: is_phone_verified
        ? "bg-green-50 text-green-700 rounded-md px-2 py-1"
        : "bg-red-50 text-red-700 rounded-md px-2 py-1",
    },
    { label: "ایمیل", value: email || "-" },
    { label: "وضعیت حساب", value: is_active ? "فعال" : "غیرفعال" },
  ];

  return (
    <BaseCard
      bodyClassName="w-full hover-reveal-parent"
      redirect={`/admin/store/customers/create?edit_id=${id}`}
    >
      <div className="relative flex flex-col items-center gap-4">
        <div>
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={`${first_name || "-"} ${last_name || "-"}`}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
              <HiOutlineUser className="text-gray-400 text-3xl" />
            </div>
          )}
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

      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default CustomerCard;
