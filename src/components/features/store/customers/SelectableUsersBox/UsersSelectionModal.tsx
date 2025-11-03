"use client";

import React, { useMemo, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbUsers } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomersFilter from "../CustomersFilter";
import CustomerCard from "../CustomerCard";
import AddNewCustomerModal from "../modals/AddNewCustomerModal";
import SelectableCard from "@/components/ui/SelectableCard";
import { FiUsers } from "react-icons/fi";
import { useGetAllUsers, UserSortBy } from "@/hooks/api/users/useUsers";
import { useListQueryParams } from "@/hooks/common/useListQueryParams";
import { useUsersSelection } from "./UsersSelectionContext";

const UsersSelectionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<UserSortBy[number]>();
  const { selectedUsers, addUser, removeUser } = useUsersSelection();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!users?.data?.items?.length;

  // فقط id های انتخاب شده
  const selectedIds = useMemo(
    () => selectedUsers.map((u) => u.id),
    [selectedUsers]
  );

  const handleSelectionChange = (user: any, selected: boolean) => {
    if (selected) addUser(user);
    else removeUser(user.id);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="انتخاب کاربران"
      confirmText="تأیید انتخاب"
      onConfirm={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      icon={<TbUsers />}
      size="3xl"
    >
      <UnifiedCard
        searchFilter={<CustomersFilter />}
        headerProps={{
          title: "انتخاب کاربران",
          icon: <FiUsers className="text-2xl" />,
          children: <AddNewCustomerModal />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={users?.data?.meta}
        childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {users?.data?.items?.map((user: any) => (
          <SelectableCard
            key={user.id}
            id={user.id}
            selectedIds={selectedIds}
            onSelectionChange={(id, selected) =>
              handleSelectionChange(user, selected)
            }
          >
            <CustomerCard infos={user} disableAction />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default UsersSelectionModal;
