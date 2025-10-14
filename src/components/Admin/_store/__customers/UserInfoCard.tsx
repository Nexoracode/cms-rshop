"use client";

import React from "react";
import { useDisclosure } from "@heroui/react";
import { useDeleteUser } from "@/hooks/api/users/useUsers";
import DynamicModal from "@/components/Helper/DynamicModal";
import SelectableCard from "@/components/common/SelectionBox/SelectableCard";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

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

const UserInfoCard: React.FC<Props> = ({
  infos,
  onSelect,
  selectedIds = [],
  disableSelect = false,
  disableAction = false,
}) => {
  const router = useRouter();
  const { id, first_name, last_name, phone, email, created_at } = infos;
  const { mutate: deleteUser } = useDeleteUser(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <RiDeleteBin5Line size={18} />
              </button>
            </div>
          )}
        </div>
      </SelectableCard>

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="تایید حذف کاربر"
        confirmText="حذف کاربر"
        onConfirm={() => deleteUser()}
      >
        <p className="leading-7 text-danger-600">
          با حذف کاربر، اطلاعات او قابل برگشت نخواهد بود. آیا مطمئن هستید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default UserInfoCard;
