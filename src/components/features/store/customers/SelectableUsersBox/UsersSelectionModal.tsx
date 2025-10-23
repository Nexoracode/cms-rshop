"use client";

import React from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/ui/modals/BaseModal";
import { useGetAllUsers } from "@/hooks/api/users/useUsers";
import { TbUsers } from "react-icons/tb";
import UsersFilter from "../CustomersFilter";
import UserInfoCard from "../CustomerCard";
import { useSelectableItems } from "@/hooks/ui/useSelectableItems";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedUsers: any[]) => void;
  selectedIds?: number[];
};

const UsersSelectionModal: React.FC<Props> = ({
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
      title="انتخاب کاربران"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={handleConfirm}
      icon={<TbUsers className="text-2xl" />}
      size="3xl"
    >
      <div className="flex flex-col gap-4">
        <UsersFilter />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner label="در حال بارگذاری کاربران..." color="secondary" />
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
            کاربری برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </DynamicModal>
  );
};

export default UsersSelectionModal;
