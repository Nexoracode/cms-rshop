"use client";

import React from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/Helper/DynamicModal";
import { useGetAllUsers } from "@/hooks/api/users/useUsers";
import { TbUsers } from "react-icons/tb";
import UsersFilter from "../../_store/__customers/UsersFilter";
import UserInfoCard from "../../_store/__customers/UserInfoCard";
import { useSelectableItems } from "@/hooks/system/useSelectableItems";
import { MdOutlineCategory } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedUsers: any[]) => void;
  selectedIds?: number[];
};

const VariantsSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedIds = [],
}) => {
  const { data: usersResponse, isLoading } = useGetAllUsers(1);
  const users = usersResponse?.data?.items ?? [];

  const {
    selectedOrder,
    handleSelect,
    handleConfirm: handleConfirmSelection,
  } = useSelectableItems(users, selectedIds, isOpen);

  const handleConfirm = () => {
    const selectedUsers = handleConfirmSelection();
    onConfirm(selectedUsers);
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="انتخاب تنوع محصول"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={handleConfirm}
      icon={<MdOutlineCategory className="text-2xl" />}
      size="3xl"
    >
      <div className="flex flex-col gap-4">
        <UsersFilter />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner label="در حال بارگذاری تنوع محصول ها..." color="secondary" />
          </div>
        ) : users.length ? (
          <div className="flex flex-col gap-4">
            {users.map((user: any) => (
              <UserInfoCard
                key={user.id}
                infos={user}
                selectedIds={selectedOrder}
                onSelect={(id, sel, u) => u && handleSelect(u, !!sel)}
                disableAction
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            تنوع محصولی برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </DynamicModal>
  );
};

export default VariantsSelectionModal;
