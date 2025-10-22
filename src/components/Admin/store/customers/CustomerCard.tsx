"use client";

import React from "react";
import { useDeleteUser } from "@/hooks/api/users/useUsers";
import SelectableCard from "@/components/shared/SelectionBox/SelectableCard";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/forms/DeleteButton";

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
  onSelect?: (id: number, selected: boolean, user?: UserInfo) => void;
  selectedIds?: number[];
  disableSelect?: boolean;
  disableAction?: boolean;
};

const CustomerCard: React.FC<Props> = ({
  infos,
  onSelect,
  selectedIds = [],
  disableSelect = false,
  disableAction = false,
}) => {
  const router = useRouter();
  const { id, first_name, last_name, phone, email, created_at } = infos;
  const { mutate: deleteUser } = useDeleteUser(id);

  return (
      <SelectableCard
        id={id}
        selectedIds={selectedIds}
        disabled={disableSelect}
        onSelectionChange={(idVal, sel) => onSelect?.(+idVal, sel, infos)}
        className="max-w-[300px] w-full sm:max-w-full"
      >
        <div className="flex flex-col xs:flex-row items-center justify-between">
          <div className="w-full flex flex-col gap-6 px-10">
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {first_name} {last_name}
              </p>
              <p className="text-gray-600 text-sm">{phone}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">{email}</p>
              <p className="text-gray-500 text-xs">
                {created_at?.slice(0, 10)}
              </p>
            </div>
          </div>
          {!disableAction && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/store/customers/create?edit_id=${id}`);
                }}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <TbEdit size={18} />
              </button>
              <DeleteButton onDelete={deleteUser} />
            </div>
          )}
        </div>
      </SelectableCard>
  );
};

export default CustomerCard;
