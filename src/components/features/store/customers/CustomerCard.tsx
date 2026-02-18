"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import CardRows from "@/components/shared/CardRows";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Customer } from "./customer.types";
import UserAddressModal from "./modals/UserAddressModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { useDeleteUser } from "@/core/hooks/api/users/useUsers";
import { HiOutlineUser } from "react-icons/hi2";
import { TbCurrentLocation } from "react-icons/tb";

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
      value: `${first_name || "نام"} ${last_name || "و نام خوانوادگی"}`,
    },
    {
      label: "شماره تماس",
      value: phone || "-",
    },
    { label: "ایمیل", value: email || "—" },
    {
      label: "وضعیت حساب",
      value: is_active ? "فعال" : "غیرفعال",
      bgLabel: is_active ? "text-green-600" : "text-red-600",
    },
    {
      label: "وریفای تلفن",
      value: is_phone_verified ? "بله" : "خیر",
      bgLabel: is_phone_verified ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <BaseCard
      bodyClassName="w-full hover-reveal-parent"
      redirect={`/admin/store/customers/create?edit_id=${id}`}
    >
      <div className="relative flex flex-col items-center mb-4">
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

        <div className="hover-reveal-child flex flex-col-reverse items-center gap-1.5">
          <UserAddressModal
            userId={id}
            btnAdd={<ActionButton icon={<TbCurrentLocation size={19} />} />}
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

      <CardRows items={rowItems} disableOddBg disableCol />
    </BaseCard>
  );
};

export default CustomerCard;
